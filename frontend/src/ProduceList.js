import React, { useState, useEffect } from 'react';
import './ProduceList.css';
import AddProductForm from './AddProductForm';

const ProduceList = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [action, setAction] = useState(null); // { type: 'buy'|'sell', product }
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuySell = (type, product) => {
    setAction({ type, product });
    setPhone('');
    setQuantity('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: Math.round(quantity * action.product.price),
          product: action.product.type,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Payment request sent! Check your phone to complete the transaction.');
      } else {
        setMessage('Payment failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      setMessage('Network error: ' + err.message);
    }
    setLoading(false);
    setAction(null);
  };

  // Add product handler for farmers
  const handleProductAdded = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="produce-list-container">
      <h2>Available Produce</h2>
      {user && user.role === 'farmer' && (
        <AddProductForm user={user} onProductAdded={handleProductAdded} />
      )}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ul className="produce-list">
          {products.map(product => (
            <li key={product.id} className="produce-item">
              <strong>{product.type}</strong><br/>
              Amount: {product.quantity} kg<br/>
              Price: KES {product.price} per kg<br/>
              <button onClick={() => handleBuySell('buy', product)} className="buy-btn">Buy</button>
              <button onClick={() => handleBuySell('sell', product)} className="sell-btn">Sell</button>
            </li>
          ))}
        </ul>
      )}
      {action && (
        <div className="daraja-form-modal">
          <form className="daraja-form" onSubmit={handleSubmit}>
            <h3>{action.type === 'buy' ? 'Buy' : 'Sell'} {action.product.type}</h3>
            <label>
              Phone Number (M-Pesa):
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required pattern="[0-9]{10,}" />
            </label>
            <label>
              Quantity (kg):
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required min="1" max={action.product.quantity} />
            </label>
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Pay with M-Pesa'}</button>
            <button type="button" onClick={() => setAction(null)} disabled={loading} style={{marginLeft:'1rem'}}>Cancel</button>
          </form>
        </div>
      )}
      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default ProduceList;