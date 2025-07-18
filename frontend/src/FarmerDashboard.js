import React, { useState } from 'react';
import './FarmerDashboard.css';

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

function FarmerDashboard() {
  const [listings, setListings] = useState(initialListings);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: null, type: '', quantity: '', price: '', harvestDate: '' });
  const [message, setMessage] = useState('');

  // Listing CRUD
  const handleEdit = (listing) => {
    setForm(listing);
    setShowForm(true);
  };
  const handleDelete = (id) => {
    setListings(listings.filter(l => l.id !== id));
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setListings(listings.map(l => l.id === form.id ? { ...form, id: form.id } : l));
    } else {
      setListings([...listings, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setForm({ id: null, type: '', quantity: '', price: '', harvestDate: '' });
  };

  // Orders
  const handleOrderAction = (id, action) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: action } : o));
  };

  // Messaging
  const handleSendMessage = () => {
    if (!message || !selectedOrder) return;
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, messages: [...o.messages, { sender: 'Farmer', text: message }] } : o));
    setMessage('');
  };

  return (
    <div className="dashboard-container">
      <h2>Farmer Dashboard</h2>
      {/* Produce Listings */}
      <section className="card">
        <div className="section-header">
          <h3>Produce Listings</h3>
          <button className="add-btn" onClick={() => { setShowForm(true); setForm({ id: null, type: '', quantity: '', price: '', harvestDate: '' }); }}>+ Add</button>
        </div>
        <ul className="listing-list">
          {listings.map(listing => (
            <li key={listing.id} className="listing-item">
              <div>
                <strong>{listing.type}</strong> | Qty: {listing.quantity} | KES {listing.price} | Harvest: {listing.harvestDate}
              </div>
              <div>
                <button onClick={() => handleEdit(listing)}>Edit</button>
                <button onClick={() => handleDelete(listing.id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        {showForm && (
          <form className="listing-form" onSubmit={handleFormSubmit}>
            <input name="type" placeholder="Type" value={form.type} onChange={handleFormChange} required />
            <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleFormChange} required />
            <input name="price" type="number" placeholder="Price (KES)" value={form.price} onChange={handleFormChange} required />
            <input name="harvestDate" type="date" placeholder="Harvest Date" value={form.harvestDate} onChange={handleFormChange} required />
            <button type="submit">{form.id ? 'Update' : 'Add'}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
      </section>

      {/* Incoming Orders */}
      <section className="card">
        <h3>Incoming Orders</h3>
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <div onClick={() => setSelectedOrder(order)} style={{ cursor: 'pointer' }}>
                <strong>{order.buyer}</strong> ordered {order.quantity} {order.produce} for KES {order.price}
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
              {order.status === 'pending' && (
                <div>
                  <button onClick={() => handleOrderAction(order.id, 'accepted')}>Accept</button>
                  <button onClick={() => handleOrderAction(order.id, 'declined')} className="decline-btn">Decline</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Messaging Panel */}
      <section className="card">
        <h3>Order Messaging</h3>
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
              <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : <div>Select an order to view messages.</div>}
      </section>

      {/* Profile Section */}
      <section className="card">
        <h3>Profile</h3>
        <div className="profile-section">
          <div className="profile-info">
            <img src="https://ui-avatars.com/api/?name=Farmer" alt="Farmer" className="avatar" />
            <div>
              <div><strong>Farmer Name</strong></div>
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

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button>Dashboard</button>
        <button>Orders</button>
        <button>Messages</button>
        <button>Profile</button>
      </nav>
    </div>
  );
}

export default FarmerDashboard;
