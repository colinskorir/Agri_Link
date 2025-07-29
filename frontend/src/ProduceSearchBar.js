import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

function ProduceSearchBar() {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    let url = `${API_BASE}/products?`;
    if (type) url += `type=${type}&`;
    if (location) url += `location=${location}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log('Search results:', data);
      // For now, just log the results. You can add a callback prop to handle the results
    } catch (err) {
      console.error('Failed to search listings:', err);
    }
  };

  return (
    <form className="produce-search-bar" onSubmit={handleSearch}>
      <input type="text" placeholder="Type" value={type} onChange={e => setType(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export default ProduceSearchBar;
