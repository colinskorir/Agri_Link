import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from "./AuthForm";
import { AuthContext } from "./App";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [authMessage, setAuthMessage] = useState('');
  const navigate = useNavigate();
  
  // Get authentication context from App.js
  const authContext = useContext(AuthContext);
  
  const handleAuth = async (authData) => {
    setAuthMessage('');
    
    // Add isLogin flag to authData
    const authDataWithFlag = { ...authData, isLogin };
    
    try {
      const result = await authContext.handleAuth(authDataWithFlag);
      
      if (result.success) {
        setAuthMessage('Authentication successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setAuthMessage(result.error || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      setAuthMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 pt-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          {isLogin ? 'Welcome Back!' : 'Join Digi-Shamba'}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {isLogin ? 'Log in to access your dashboard' : 'Create an account to start selling or buying produce'}
        </p>
        
        {authMessage && (
          <div className={`mb-4 p-3 rounded ${
            authMessage.includes('successful') 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {authMessage}
          </div>
        )}
        
        <AuthForm 
          onAuth={handleAuth} 
          isLogin={isLogin} 
          setIsLogin={setIsLogin} 
        />
        
        <div className="text-center mt-4">
          <Link to="/" className="text-green-700 hover:text-green-800 underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
