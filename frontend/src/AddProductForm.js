import React, { useState } from 'react';

const AddProductForm = ({ user, onProductAdded }) => {
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: user.id,
          type,
          quantity,
          price,
          harvest_date: harvestDate,
          image_url: imageUrl
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const newProduct = await response.json();
      onProductAdded(newProduct);
      // Reset form
      setType('');
      setQuantity('');
      setPrice('');
      setHarvestDate('');
      setImageUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-form-container">
      <h3>Add a New Product</h3>
      <form onSubmit={handleSubmit} className="add-product-form">
        <label>
          Product Type:
          <input type="text" value={type} onChange={e => setType(e.target.value)} required />
        </label>
        <label>
          Quantity (kg):
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        </label>
        <label>
          Price (KES per kg):
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </label>
        <label>
          Harvest Date:
          <input type="date" value={harvestDate} onChange={e => setHarvestDate(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddProductForm; 