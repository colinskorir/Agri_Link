const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: 'locco',
  host: 'localhost',
  database: 'agri_link',
  password: '123456789',
  port: 5432,
});

pool.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});


// Endpoint to serve produce config
app.get('/api/produce-config', (req, res) => {
  const config = require(path.join(__dirname, 'produceConfig.json'));
  res.json(config);
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  const { userType, name, location, password, businessType } = req.body;

  try {
    // Check if user with this name already exists
    const existingUser = await pool.query('SELECT * FROM Users WHERE name = $1', [name]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this name already exists' });
    }
    
    // Generate unique email
    const randomNum = Math.floor(Math.random() * 10000);
    const email = `${name.toLowerCase().replace(/\s+/g, '')}${randomNum}@digishamba.com`;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO Users (role, name, email, password_hash, location, business_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [userType, name, email, hashedPassword, location, businessType];
    
    const { rows } = await pool.query(query, values);
    const user = rows[0];
    
    // Remove password_hash from response
    delete user.password_hash;
    
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  const query = 'SELECT * FROM Users WHERE name = $1';
  try {
    const { rows } = await pool.query(query, [name]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Remove password_hash from response
    delete user.password_hash;

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Get all produce listings
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Produce_Listings');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add a new product (with image_url)
app.post('/api/products', async (req, res) => {
  const { farmer_id, type, quantity, price, harvest_date, image_url } = req.body;
  try {
    const query = 'INSERT INTO Produce_Listings (farmer_id, type, quantity, price, harvest_date, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [farmer_id, type, quantity, price, harvest_date, image_url];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Update product (with image_url)
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { type, quantity, price, harvest_date, image_url } = req.body;
  try {
    const query = 'UPDATE Produce_Listings SET type = $1, quantity = $2, price = $3, harvest_date = $4, image_url = $5 WHERE id = $6 RETURNING *';
    const values = [type, quantity, price, harvest_date, image_url, id];
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});


app.post('/api/pay', async (req, res) => {
  const { phone, amount, product } = req.body;

  // Validate required fields
  if (!phone || !amount || !product) {
    return res.status(400).json({ error: 'Missing required fields: phone, amount, product' });
  }

  // Validate amount
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0' });
  }

  // Validate and format phone number
  let formattedPhone = phone.startsWith('254') ? phone : `254${phone.slice(-9)}`;
  if (!/^(254)\d{9}$/.test(formattedPhone)) {
    return res.status(400).json({ error: 'Invalid phone number format. Use 254...' });
  }

  // Daraja credentials (Sandbox for development/testing)
  // IMPORTANT: Replace these with your actual credentials from https://developer.safaricom.co.ke/
  const consumerKey = 'BwB7edqKkAzJXhdkIWMPhInur5A0wEnJWlbr1oG7cVRMUdyl'; // Get this from Safaricom developer portal
  const consumerSecret = 'UrQo5u0Pc89AKGmdTXHLD5A7HxQqfZ2yTXwWtS3WE0fYMAsHWRLMflCzYXI1dwPa'; // Get this from Safaricom developer portal
  const businessShortCode = '174379'; // Safaricom Sandbox Shortcode
  const passkey = 'bfb279f9aa9bdbcf158e99dd770b4bcf924c8b3d9f78a7e73be5e505bf86d97'; // Sandbox passkey
  
  // IMPORTANT: Replace this with your actual ngrok URL when testing
  // Run: ngrok http 5000 and use the HTTPS URL it provides
  const callbackURL = 'https://your-actual-ngrok-url.ngrok.io/api/daraja-callback';

  // Get access token
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  try {
    console.log('Requesting access token from Safaricom...');
    const { data: tokenRes } = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    
    if (!tokenRes.access_token) {
      throw new Error('Failed to get access token from Safaricom');
    }
    
    const accessToken = tokenRes.access_token;
    console.log('Access token obtained successfully');

    // Prepare STK Push request
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');
    const payload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: businessShortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackURL,
      AccountReference: product,
      TransactionDesc: `Payment for ${product}`,
    };

    console.log('Sending STK Push to phone:', formattedPhone, 'Amount:', amount);
    
    // Send STK Push
    const { data: stkRes } = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    console.log('STK Push response:', stkRes);
    
    if (stkRes.ResponseCode === '0') {
      res.json({ 
        success: true, 
        message: 'Payment prompt sent successfully! Check your phone to complete the transaction.',
        checkoutRequestID: stkRes.CheckoutRequestID,
        merchantRequestID: stkRes.MerchantRequestID,
        stkRes 
      });
    } else {
      res.status(400).json({ 
        error: 'Failed to send payment prompt', 
        details: stkRes.ResponseDescription || 'Unknown error',
        stkRes 
      });
    }
  } catch (err) {
    console.error('Daraja error:', err.response?.data || err.message);
    res.status(500).json({ 
      error: 'Daraja payment failed', 
      details: err.response?.data || err.message 
    });
  }
});

// Callback endpoint to receive payment results from Safaricom
app.post('/api/daraja-callback', (req, res) => {
  console.log('Received callback from Safaricom:', req.body);
  
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;
    
    if (stkCallback.ResultCode === 0) {
      // Payment successful
      console.log('Payment successful:', stkCallback);
      res.json({ success: true, message: 'Payment processed successfully' });
    } else {
      // Payment failed
      console.log('Payment failed:', stkCallback);
      res.json({ success: false, message: 'Payment failed', details: stkCallback.ResultDesc });
    }
  } catch (error) {
    console.error('Error processing callback:', error);
    res.status(500).json({ error: 'Error processing callback' });
  }
});

// Seed products endpoint
app.post('/api/seed-products', async (req, res) => {
  const sampleProducts = [
    { type: 'Maize', quantity: 1000, price: 30, harvest_date: '2025-07-01' },
    { type: 'Beans', quantity: 500, price: 80, harvest_date: '2025-06-15' },
    { type: 'Tomatoes', quantity: 300, price: 50, harvest_date: '2025-07-10' },
    { type: 'Potatoes', quantity: 800, price: 40, harvest_date: '2025-07-05' },
    { type: 'Cabbage', quantity: 200, price: 25, harvest_date: '2025-07-12' }
  ];
  try {
    // Find a farmer to assign products to
    const { rows: farmers } = await pool.query("SELECT id FROM Users WHERE role = 'farmer' LIMIT 1");
    if (farmers.length === 0) {
      return res.status(400).json({ error: 'No farmer found. Please register a farmer first.' });
    }
    const farmer_id = farmers[0].id;
    for (const prod of sampleProducts) {
      await pool.query(
        'INSERT INTO Produce_Listings (farmer_id, type, quantity, price, harvest_date) VALUES ($1, $2, $3, $4, $5)',
        [farmer_id, prod.type, prod.quantity, prod.price, prod.harvest_date]
      );
    }
    res.json({ message: 'Sample products seeded successfully.' });
  } catch (err) {
    console.error('Error seeding products:', err);
    res.status(500).json({ error: 'Failed to seed products.' });
  }
});

// Get all orders for a farmer
app.get('/api/orders', async (req, res) => {
  const { farmer_id } = req.query;
  try {
    const query = 'SELECT * FROM Orders WHERE farmer_id = $1';
    const { rows } = await pool.query(query, [farmer_id]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const query = 'UPDATE Orders SET status = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [status, id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Get messages for an order
app.get('/api/orders/:id/messages', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM Order_Messages WHERE order_id = $1 ORDER BY created_at ASC';
    const { rows } = await pool.query(query, [id]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send a message for an order
app.post('/api/orders/:id/messages', async (req, res) => {
  const { id } = req.params;
  const { sender, text } = req.body;
  try {
    const query = 'INSERT INTO Order_Messages (order_id, sender, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *';
    const values = [id, sender, text];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});


// Default port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
