import React from "react";
import './UserProfiles.css';

const defaultProfilePics = [
  'https://i.pinimg.com/1200x/d4/fd/c6/d4fdc62672a3545c1a6838a652869b76.jpg',
  'https://i.pinimg.com/1200x/ff/84/8e/ff848eb535a55e2da451e4dac1cd0d4d.jpg',
];
const profileBg = 'https://i.pinimg.com/1200x/c5/43/a3/c543a37f145a68fa675f37593e41f2b4.jpg';
const profileIcon = 'https://i.pinimg.com/1200x/95/76/a4/9576a4ea2172b65c7e4d542526fda95c.jpg';

// Mock user data
const user = {
  name: 'Jane Mwangi',
  role: 'Farmer',
  location: 'Nakuru',
  profilePic: '', // Use default if empty
};

function UserProfiles() {
  return (
    <section
      className="user-profile-section"
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="user-profile-card">
        <img
          src={user.profilePic || defaultProfilePics[0]}
          alt="Profile"
          className="profile-pic"
        />
        <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-role">{user.role}</p>
        <p className="profile-location">{user.location}</p>
      </div>
    </section>
  );
}

export default UserProfiles; 