import React from "react";

function Dashboard({ user, onLogout }) {
  return (
    <section className="py-20 bg-green-50 min-h-screen flex items-center justify-center" aria-label="Dashboard">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Welcome, {user.name}!</h2>
        <div className="mb-2">
          <span className="font-semibold">Role:</span> {user.userType === 'farmer' ? 'Farmer' : 'Seller'}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Location:</span> {user.location}
        </div>
        {user.userType === 'seller' && (
          <div className="mb-2">
            <span className="font-semibold">Business Type:</span> {user.businessType}
          </div>
        )}
        <button
          className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={onLogout}
        >Logout</button>
      </div>
    </section>
  );
}

export default Dashboard; 