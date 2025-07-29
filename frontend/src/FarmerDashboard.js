import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FarmerDashboard.css';
import ProduceSearchBar from './ProduceSearchBar';

const API_BASE = 'http://localhost:5000/api';

const initialListings = [
  { id: 1, type: 'Maize', quantity: 100, price: 2500, harvestDate: '2025-07-01' },
  { id: 2, type: 'Tomatoes', quantity: 50, price: 1500, harvestDate: '2025-07-10' },
];

const initialOrders = [
  { id: 1, buyer: 'Jane Doe', produce: 'Maize', quantity: 20, price: 500, status: 'pending', messages: [] },
  { id: 2, buyer: 'John Mwangi', produce: 'Tomatoes', quantity: 10, price: 300, status: 'pending', messages: [] },
];

const certifications = ['Organic Certified', 'Fair Trade'];
const reviews = [
  { reviewer: 'Buyer A', rating: 5, comment: 'Great quality!' },
  { reviewer: 'Buyer B', rating: 4, comment: 'Fast delivery.' },
];

function FarmerDashboard({ user }) {
  const [listings, setListings] = useState(initialListings);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: null, type: '', quantity: '', price: '', harvestDate: '', image_url: '' });
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [role, setRole] = useState(user?.role || 'farmer');

  useEffect(() => {
    fetchListings();
    fetchOrders();
  }, []);

  // Fetch produce listings from backend
  const fetchListings = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setListings([]); // Defensive: set to empty array on error
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      // Use actual logged-in user's ID
      const farmer_id = user?.id || 1;
      const res = await fetch(`${API_BASE}/orders?farmer_id=${farmer_id}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  // Add new produce listing to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.type || !form.quantity || !form.price || !form.harvestDate) return;
    if (form.id) {
      await handleUpdateListing();
    } else {
      try {
        const farmer_id = user?.id || 1;
        const res = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            farmer_id,
            type: form.type,
            quantity: form.quantity,
            price: form.price,
            harvest_date: form.harvestDate,
            image_url: form.image_url
          })
        });
        const newListing = await res.json();
        setListings([...listings, newListing]);
        setShowForm(false);
        setForm({ id: null, type: '', quantity: '', price: '', harvestDate: '', image_url: '' });
      } catch (err) {
        console.error('Failed to add listing:', err);
      }
    }
  };

  // Edit produce listing
  const handleEdit = (listing) => {
    setForm(listing);
    setShowForm(true);
  };

  // Update produce listing in backend
  const handleUpdateListing = async () => {
    if (!form.id) return;
    try {
      const res = await fetch(`${API_BASE}/products/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: form.type,
          quantity: form.quantity,
          price: form.price,
          harvest_date: form.harvestDate,
          image_url: form.image_url
        })
      });
      const updated = await res.json();
      setListings(listings.map(l => l.id === updated.id ? updated : l));
      setShowForm(false);
      setForm({ id: null, type: '', quantity: '', price: '', harvestDate: '', image_url: '' });
    } catch (err) {
      console.error('Failed to update listing:', err);
    }
  };

  // Delete produce listing in backend
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      setListings(listings.filter(l => l.id !== id));
    } catch (err) {
      console.error('Failed to delete listing:', err);
    }
  };

  // Update order status in backend
  const handleOrderAction = async (id, action) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      });
      const updated = await res.json();
      setOrders(orders.map(o => o.id === updated.id ? updated : o));
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  // Fetch messages for selected order
  const fetchMessages = async (orderId) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/messages`);
      const data = await res.json();
      setOrders(orders.map(o => o.id === orderId ? { ...o, messages: data } : o));
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  // Send message for selected order
  const handleSendMessage = async () => {
    if (!message || !selectedOrder) return;
    try {
      await fetch(`${API_BASE}/orders/${selectedOrder.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'Farmer', text: message })
      });
      setMessage('');
      fetchMessages(selectedOrder.id);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  // When selecting an order, fetch its messages
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    fetchMessages(order.id);
  };

  // Add handleFormChange if missing
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard-container" role="main" aria-label="User Dashboard">
      <h2 tabIndex="0">Welcome, {user?.name || 'User'}!</h2>
      {user && (
        <div className="user-info">
          <p><strong>Role:</strong> {user.role === 'farmer' ? 'Farmer' : 'Buyer'}</p>
          <p><strong>Location:</strong> {user.location}</p>
          {user.business_type && <p><strong>Business Type:</strong> {user.business_type}</p>}
        </div>
      )}
      
      {/* Produce Listings */}
      {activeSection === 'dashboard' && (
        <>
          {role === 'buyer' && <ProduceSearchBar />}
          <section className="card" aria-label="Produce Listings">
            <div className="section-header">
              <h3 tabIndex="0">Produce Listings</h3>
              {role === 'farmer' && (
                <button className="add-btn" aria-label="Add new produce listing" onClick={() => { setShowForm(true); setForm({ id: null, type: '', quantity: '', price: '', harvestDate: '' }); }}>+ Add</button>
              )}
            </div>
            <ul className="listing-list">
              {(Array.isArray(listings) ? listings : []).map(listing => (
                <li key={listing.id} className="listing-item">
                  <div>
                    {listing.image_url && <img src={listing.image_url} alt={listing.type} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', marginRight: '8px' }} />}
                    <strong>{listing.type}</strong> | Qty: {listing.quantity} | KES {listing.price} | Harvest: {listing.harvestDate}
                  </div>
                  {role === 'farmer' && (
                    <div>
                      <button aria-label={`Edit ${listing.type}`} onClick={() => handleEdit(listing)}>Edit</button>
                      <button aria-label={`Delete ${listing.type}`} onClick={() => handleDelete(listing.id)} className="delete-btn">Delete</button>
                    </div>
                  )}
                  {role === 'buyer' && (
                    <div>
                      <button aria-label={`Buy ${listing.type}`} onClick={() => console.log('Buy clicked for', listing.type)}>Buy</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {showForm && role === 'farmer' && (
              <form className="listing-form" onSubmit={handleFormSubmit} aria-label="Produce Form">
                <input name="type" placeholder="Type" value={form.type} onChange={handleFormChange} required aria-label="Produce Type" />
                <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleFormChange} required aria-label="Quantity" />
                <input name="price" type="number" placeholder="Price (KES)" value={form.price} onChange={handleFormChange} required aria-label="Price" />
                <input name="harvestDate" type="date" placeholder="Harvest Date" value={form.harvestDate} onChange={handleFormChange} required aria-label="Harvest Date" />
                <input name="image_url" type="text" placeholder="Image URL" value={form.image_url} onChange={handleFormChange} aria-label="Image URL" />
                <button type="submit">{form.id ? 'Update' : 'Add'}</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </form>
            )}
          </section>
        </>
      )}

      {/* Incoming Orders */}
      {activeSection === 'orders' && (
        <section className="card" aria-label="Incoming Orders">
          <h3 tabIndex="0">Incoming Orders</h3>
          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <div onClick={() => handleSelectOrder(order)} style={{ cursor: 'pointer' }} aria-label={`Order from ${order.buyer}`} tabIndex="0">
                  <strong>{order.buyer}</strong> ordered {order.quantity} {order.produce} for KES {order.price}
                  <span className={`status ${order.status}`}>{order.status}</span>
                </div>
                {order.status === 'pending' && (
                  <div>
                    <button aria-label="Accept order" onClick={() => handleOrderAction(order.id, 'accepted')}>Accept</button>
                    <button aria-label="Decline order" onClick={() => handleOrderAction(order.id, 'declined')} className="decline-btn">Decline</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Messaging Panel */}
      {activeSection === 'messages' && (
        <section className="card" aria-label="Order Messaging">
          <h3 tabIndex="0">Order Messaging</h3>
          {selectedOrder ? (
            <div className="messaging-panel">
              <div className="order-summary">
                <strong>Order:</strong> {selectedOrder.buyer} - {selectedOrder.produce}
              </div>
              <div className="messages">
                {selectedOrder.messages.map((msg, idx) => (
                  <div key={idx} className={`msg-bubble ${msg.sender === 'Farmer' ? 'farmer' : 'buyer'}`}>{msg.text}</div>
                ))}
              </div>
              <div className="msg-input-row">
                <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." aria-label="Message input" />
                <button onClick={handleSendMessage} aria-label="Send message">Send</button>
              </div>
            </div>
          ) : <div>Select an order to view messages.</div>}
        </section>
      )}

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <section className="card" aria-label="Profile">
          <h3 tabIndex="0">Profile</h3>
          <div className="profile-section">
            <div className="profile-info">
              <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Farmer'}`} alt={user?.name || 'Farmer'} className="avatar" />
              <div>
                <div><strong>{user?.name || 'Farmer Name'}</strong></div>
                <div>Certifications:</div>
                <ul className="cert-list">
                  {certifications.map((cert, idx) => <li key={idx}>{cert}</li>)}
                </ul>
              </div>
            </div>
            <div className="reviews">
              <div><strong>Reviews:</strong></div>
              {reviews.map((r, idx) => (
                <div key={idx} className="review-item">
                  <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span> {r.comment}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        <Link to="/dashboard"><button aria-label="Dashboard">Dashboard</button></Link>
        <Link to="/users"><button aria-label="Users">Users</button></Link>
        <Link to="/dashboard"><button aria-label="Orders">Orders</button></Link>
        <Link to="/dashboard"><button aria-label="Profile">Profile</button></Link>
      </nav>
    </div>
  );
}

export default FarmerDashboard;
