import React from 'react';

const mockOrders = [
  { id: 1, buyer: 'FreshMart Ltd', product: 'Maize', quantity: 200, status: 'Pending', image_url: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
  { id: 2, buyer: 'GreenGrocers', product: 'Beans', quantity: 100, status: 'Confirmed', image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  { id: 3, buyer: 'FreshMart Ltd', product: 'Tomatoes', quantity: 50, status: 'Delivered', image_url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
];

const OrderManagement = ({ onBack }) => (
  <div className="produce-list-container">
    <button onClick={onBack} style={{ marginBottom: '1rem' }}>&larr; Back</button>
    <h2>Order Management</h2>
    <ul className="produce-list">
      {mockOrders.map(order => (
        <li key={order.id} className="produce-item">
          {order.image_url && (
            <img src={order.image_url} alt={order.product} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '1rem' }} />
          )}
          <div>
            <strong>Buyer:</strong> {order.buyer}<br/>
            <strong>Product:</strong> {order.product}<br/>
            <strong>Quantity:</strong> {order.quantity}<br/>
            <strong>Status:</strong> {order.status}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default OrderManagement;