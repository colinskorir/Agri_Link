import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from './AuthPage';
import FarmerDashboard from './FarmerDashboard';
import UserProfiles from './UserProfiles';
import OrderManagement from './OrderManagement';
import ProduceList from './ProduceList';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';

// Authentication Context
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = async (authData) => {
    try {
      const endpoint = authData.isLogin ? '/api/login' : '/api/register';
      
      let requestBody;
      if (authData.isLogin) {
        // Login format
        requestBody = {
          name: authData.name,
          password: authData.password
        };
      } else {
        // Registration format
        requestBody = {
          name: authData.name,
          location: authData.location,
          password: authData.password,
          userType: authData.userType,
          businessType: authData.businessType || null
        };
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user || userData); // Handle both response formats
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData.user || userData));
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Authentication failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth" replace />;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, handleAuth, handleLogout }}>
      <Router>
    <div className="app-bg">
      <div className="app-overlay" />
      <div className="app-content">
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main>
              <Routes>
                <Route path="/" element={<><Hero /><Services /></>} />
                <Route path="/auth" element={
                  isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <FarmerDashboard user={user} />
                  </ProtectedRoute>
                } />
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
    </AuthContext.Provider>
  );
}

export default App;