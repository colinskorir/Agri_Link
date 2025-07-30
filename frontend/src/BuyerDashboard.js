import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FarmerDashboard.css'; // Reuse the same CSS for consistency

const API_BASE = 'http://localhost:5000/api';

function BuyerDashboard({ user }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample data for buyer dashboard
  const buyerStats = {
    totalOrders: 12,
    totalSpent: 45000,
    favoriteProducts: ['Tomatoes', 'Maize', 'Beans'],
    recentActivity: [
      { type: 'order', product: 'Tomatoes', amount: 5000, date: '2024-01-15' },
      { type: 'payment', product: 'Maize', amount: 3000, date: '2024-01-14' },
      { type: 'message', farmer: 'Collins korir', date: '2024-01-13' }
    ]
  };

  useEffect(() => {
    fetchBuyerOrders();
    fetchSavedProducts();
  }, []);

  const fetchBuyerOrders = async () => {
    try {
      const buyer_id = user?.id || 1;
      const res = await fetch(`${API_BASE}/orders?buyer_id=${buyer_id}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setOrders([]);
    }
  };

  const fetchSavedProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      // For now, just show all products as "saved" - you can implement actual saved products later
      setSavedProducts(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (err) {
      console.error('Failed to fetch saved products:', err);
      setSavedProducts([]);
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    fetchMessages(order.id);
  };

  const fetchMessages = async (orderId) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/messages`);
      const data = await res.json();
      setSelectedOrder(prev => ({ ...prev, messages: data }));
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedOrder) return;
    try {
      const res = await fetch(`${API_BASE}/orders/${selectedOrder.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'buyer', text: message })
      });
      const newMessage = await res.json();
      setSelectedOrder(prev => ({
        ...prev,
        messages: [...(prev.messages || []), newMessage]
      }));
      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="dashboard-container" role="main" aria-label="Buyer Dashboard">
      <h2 tabIndex="0">Welcome, {user?.name || 'Buyer'}!</h2>
      {user && (
        <div className="user-info">
          <p><strong>Role:</strong> Buyer</p>
          <p><strong>Location:</strong> {user.location}</p>
          {user.business_type && <p><strong>Business Type:</strong> {user.business_type}</p>}
        </div>
      )}

      {/* Buyer Stats Overview */}
      {activeSection === 'dashboard' && (
        <section className="card" aria-label="Buyer Overview">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 tabIndex="0">Your Shopping Overview</h3>
            <Link to="/products" style={{ 
              backgroundColor: '#059669', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px', 
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              Browse Products
            </Link>
          </div>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div className="stat-card" style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h4>Total Orders</h4>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>{buyerStats.totalOrders}</p>
            </div>
            <div className="stat-card" style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h4>Total Spent</h4>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>KES {buyerStats.totalSpent.toLocaleString()}</p>
            </div>
            <div className="stat-card" style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h4>Favorite Products</h4>
              <p style={{ fontSize: '1.2rem', color: '#059669' }}>{buyerStats.favoriteProducts.join(', ')}</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h4>Recent Activity</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {buyerStats.recentActivity.map((activity, idx) => (
                <li key={idx} style={{ 
                  padding: '0.5rem', 
                  marginBottom: '0.5rem', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '4px',
                  borderLeft: '4px solid #059669'
                }}>
                  <strong>{activity.type === 'order' ? '📦' : activity.type === 'payment' ? '💳' : '💬'}</strong>
                  {activity.type === 'order' && ` Ordered ${activity.product} for KES ${activity.amount}`}
                  {activity.type === 'payment' && ` Paid KES ${activity.amount} for ${activity.product}`}
                  {activity.type === 'message' && ` Messaged ${activity.farmer}`}
                  <span style={{ float: 'right', color: '#6b7280' }}>{activity.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* My Orders */}
      {activeSection === 'orders' && (
        <section className="card" aria-label="My Orders">
          <h3 tabIndex="0">My Orders</h3>
          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <div onClick={() => handleSelectOrder(order)} style={{ cursor: 'pointer' }} aria-label={`Order for ${order.produce}`} tabIndex="0">
                  <strong>{order.produce}</strong> - {order.quantity}kg for KES {order.price}
                  <span className={`status ${order.status}`}>{order.status}</span>
                </div>
              </li>
            ))}
            {orders.length === 0 && (
              <li style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                No orders yet. Start shopping to see your orders here!
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Saved Products */}
      {activeSection === 'saved' && (
        <section className="card" aria-label="Saved Products">
          <h3 tabIndex="0">Saved Products</h3>
          <ul className="listing-list">
            {savedProducts.map(product => (
              <li key={product.id} className="listing-item">
                <div>
                  {product.image_url && <img src={product.image_url} alt={product.type} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', marginRight: '8px' }} />}
                  <strong>{product.type}</strong> | Qty: {product.quantity} | KES {product.price} | Harvest: {product.harvestDate}
                </div>
                <div>
                  <button aria-label={`Buy ${product.type}`} onClick={() => window.location.href = '/products'}>Buy Now</button>
                  <button aria-label={`Remove ${product.type} from saved`} style={{ backgroundColor: '#ef4444' }}>Remove</button>
                </div>
              </li>
            ))}
            {savedProducts.length === 0 && (
              <li style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                No saved products yet. Browse products to save your favorites!
              </li>
            )}
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
                <strong>Order:</strong> {selectedOrder.produce} - {selectedOrder.quantity}kg
              </div>
              <div className="messages">
                {selectedOrder.messages?.map((msg, idx) => (
                  <div key={idx} className={`msg-bubble ${msg.sender === 'buyer' ? 'buyer' : 'farmer'}`}>{msg.text}</div>
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
              <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Buyer'}`} alt={user?.name || 'Buyer'} className="avatar" />
              <div>
                <div><strong>{user?.name || 'Buyer Name'}</strong></div>
                <div><strong>Email:</strong> {user?.email}</div>
                <div><strong>Location:</strong> {user?.location}</div>
                {user?.business_type && <div><strong>Business Type:</strong> {user.business_type}</div>}
              </div>
            </div>
            <div className="preferences">
              <h4>Preferences</h4>
              <div>
                <label>
                  <input type="checkbox" defaultChecked /> Receive order updates via SMS
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" defaultChecked /> Get notifications for new products
                </label>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        <button onClick={() => setActiveSection('dashboard')} aria-label="Dashboard">Dashboard</button>
        <button onClick={() => setActiveSection('orders')} aria-label="My Orders">My Orders</button>
        <button onClick={() => setActiveSection('saved')} aria-label="Saved Products">Saved</button>
        <button onClick={() => setActiveSection('messages')} aria-label="Messages">Messages</button>
        <button onClick={() => setActiveSection('profile')} aria-label="Profile">Profile</button>
      </nav>
    </div>
  );
}

export default BuyerDashboard; 