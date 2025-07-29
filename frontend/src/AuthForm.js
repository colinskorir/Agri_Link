import React, { useState } from "react";

function AuthForm({ onAuth, isLogin, setIsLogin }) {
  const [userType, setUserType] = useState('farmer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login validation
      if (!email || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      onAuth({
        email,
        password
      });
    } else {
      // Registration validation
      if (!name || !email || !location || (userType === 'buyer' && !businessType) || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setError('');
      onAuth({
        userType,
        name,
        email,
        location,
        businessType: userType === 'buyer' ? businessType : undefined,
        password
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 pt-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">I am a:</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="farmer"
                      checked={userType === 'farmer'}
                      onChange={() => setUserType('farmer')}
                      className="form-radio text-green-700"
                    />
                    <span className="ml-2">Farmer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="buyer"
                      checked={userType === 'buyer'}
                      onChange={() => setUserType('buyer')}
                      className="form-radio text-green-700"
                    />
                    <span className="ml-2">Buyer</span>
                  </label>
                </div>
              </div>
            </>
          )}
          
          {/* Email field for both login and signup */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Name field only for signup */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Location</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
              </div>
              {userType === 'buyer' && (
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Business Type</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={businessType}
                    onChange={e => setBusinessType(e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          )}
          
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Confirm Password</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center mt-2">
          {isLogin ? (
            <span>Don't have an account?{' '}
              <button className="text-green-700 underline" onClick={() => setIsLogin(false)}>Sign Up</button>
            </span>
          ) : (
            <span>Already have an account?{' '}
              <button className="text-green-700 underline" onClick={() => setIsLogin(true)}>Log In</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm; 