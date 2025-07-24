import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './AuthPage';
import FarmerDashboard from './FarmerDashboard';
import UserProfiles from './UserProfiles';
import OrderManagement from './OrderManagement';
import ProduceList from './ProduceList';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';

function App() {
  return (
    <Router>
      <div className="app-bg">
        {/* Overlay for readability */}
        <div className="app-overlay" />
        <div className="app-content">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<><Hero /><Services /></>} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<FarmerDashboard />} />
              <Route path="/users" element={<UserProfiles />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/products" element={<ProduceList />} />
            </Routes>
          </main>
          <footer className="bg-green-700 text-white text-center py-4 mt-8">
            &copy; {new Date().getFullYear()} Digi-Shamba. All rights reserved.
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;