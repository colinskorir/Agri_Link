import React from 'react';

const mockUsers = [
  { id: 1, name: 'John Mwangi', role: 'Farmer', location: 'Nakuru' },
  { id: 2, name: 'Mary Wanjiku', role: 'Farmer', location: 'Eldoret' },
  { id: 3, name: 'FreshMart Ltd', role: 'Buyer', location: 'Nairobi' },
  { id: 4, name: 'GreenGrocers', role: 'Buyer', location: 'Mombasa' },
];

const UserProfiles = ({ onBack }) => (
  <div className="produce-list-container">
    <button onClick={onBack} style={{ marginBottom: '1rem' }}>&larr; Back</button>
    <h2>User Profiles</h2>
    <ul className="produce-list">
      {mockUsers.map(user => (
        <li key={user.id} className="produce-item">
          <strong>{user.name}</strong><br/>
          Role: {user.role}<br/>
          Location: {user.location}
        </li>
      ))}
    </ul>
  </div>
);

export default UserProfiles; 