// seedProducts.js
// Script to automate seeding products via backend API

const axios = require('axios');

const API_URL = 'http://localhost:5000/api/products'; // Adjust if your backend runs on a different port

// Sample products to seed
const products = [
  {
    farmer_id: 1, // Replace with actual farmer_id if needed
    type: 'Garlic',
    quantity: 100,
    price: 50,
    harvest_date: new Date().toISOString().split('T')[0],
    image_url: 'https://via.placeholder.com/150',
  },
  {
    farmer_id: 1,
    type: 'Cabbages',
    quantity: 50,
    price: 80,
    harvest_date: new Date().toISOString().split('T')[0],
    image_url: 'https://via.placeholder.com/150',
  },
  {
    farmer_id: 1,
    type: 'Potatoes',
    quantity: 200,
    price: 60,
    harvest_date: new Date().toISOString().split('T')[0],
    image_url: 'https://via.placeholder.com/150',
  },
  {
    farmer_id: 1,
    type: 'Avocado',
    quantity: 75,
    price: 30,
    harvest_date: new Date().toISOString().split('T')[0],
    image_url: 'https://via.placeholder.com/150',
  },
  {
    farmer_id: 1,
    type: 'Green grams',
    quantity: 120,
    price: 150,
    harvest_date: new Date().toISOString().split('T')[0],
    image_url: 'https://via.placeholder.com/150',
  },
];

async function seedProducts() {
  for (const product of products) {
    try {
      const res = await axios.post(API_URL, product);
      console.log(`Seeded: ${product.type}`);
    } catch (err) {
      console.error(`Error seeding ${product.type}:`, err.response ? err.response.data : err.message);
    }
  }
  console.log('Seeding complete.');
}

seedProducts();
