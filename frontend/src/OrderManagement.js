import React from 'react';

const mockOrders = [
  { id: 1, buyer: 'FreshMart Ltd', product: 'Maize', quantity: 200, status: 'Pending' },
  { id: 2, buyer: 'GreenGrocers', product: 'Beans', quantity: 100, status: 'Confirmed' },
  { id: 3, buyer: 'FreshMart Ltd', product: 'Tomatoes', quantity: 50, status: 'Delivered' },
];

const OrderManagement = ({ onBack }) => (
  <div className="produce-list-container">
    <button onClick={onBack} style={{ marginBottom: '1rem' }}>&larr; Back</button>
    <h2>Order Management</h2>
    <ul className="produce-list">
      {mockOrders.map(order => (
        <li key={order.id} className="produce-item">
          <strong>Buyer:</strong> {order.buyer}<br/>
          <strong>Product:</strong> {order.product}<br/>
          <strong>Quantity:</strong> {order.quantity}<br/>
          <strong>Status:</strong> {order.status}
        </li>
      ))}
    </ul>
  </div>
);

export default OrderManagement; 