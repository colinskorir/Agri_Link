import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import AuthForm from "./AuthForm";
import Dashboard from "./Dashboard";
import AuthModal from "./AuthModal"
import React from "react";
import './App.css';
import FarmerDashboard from './FarmerDashboard';

function Navbar({ onNav, current, isAuthenticated, onLogout }) {
  const [open, setOpen] = useState(false);
  // Keyboard accessibility for hamburger
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };
  return (
    <nav aria-label="Main navigation" role="navigation">
      {/* Kenyan flag stripes */}
      <div className="w-full h-2 bg-black" />
      <div className="w-full h-0.5 bg-white" />
      <div className="w-full bg-red-700 shadow flex items-center justify-between h-16 px-4">
        <div className="flex-1 flex items-center">
          <a
            href="#home"
            className="flex items-center font-bold text-2xl tracking-tight hover:underline focus:outline-none cursor-pointer text-left text-white focus-visible:ring-2 focus-visible:ring-green-400"
            tabIndex={0}
            onClick={e => { e.preventDefault(); onNav('home'); }}
            aria-label="Go to Home"
          >
            {/* Leaf icon for agriculture */}
            <svg className="h-7 w-7 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10.75 2.75c-3.5 0-6.5 2.5-7.5 6.5 2.5-1.5 5.5-2 8.5-1.5-2.5 1-4.5 3.5-4.5 6.5 0 1.5 1 2.5 2.5 2.5 2.5 0 6.5-2.5 6.5-7.5 0-2-1.5-6-5.5-6z" />
            </svg>
            Agri-Link
          </a>
        </div>
        <div className="hidden md:flex space-x-8" role="menubar">
          <button
            className={`hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'home' ? 'underline text-green-400' : 'text-white'}`}
            onClick={() => onNav('home')}
            aria-current={current === 'home' ? "page" : undefined}
            role="menuitem"
          >Home</button>
          <button
            className={`hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'services' ? 'underline text-green-400' : 'text-white'}`}
            onClick={() => onNav('services')}
            aria-current={current === 'services' ? "page" : undefined}
            role="menuitem"
          >Services</button>
          {isAuthenticated ? (
            <>
              <button
                className={`hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'profile' ? 'underline text-green-400' : 'text-white'}`}
                onClick={() => onNav('profile')}
                aria-current={current === 'profile' ? "page" : undefined}
                role="menuitem"
              >Dashboard</button>
              <button
                className="hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 text-white"
                onClick={onLogout}
                role="menuitem"
              >Logout</button>
            </>
          ) : (
            <button
              className={`hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'auth' ? 'underline text-green-400' : 'text-white'}`}
              onClick={() => onNav('auth')}
              aria-current={current === 'auth' ? "page" : undefined}
              role="menuitem"
            >Sign Up / Log In</button>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            onKeyDown={e => handleKeyDown(e, () => setOpen(!open))}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            tabIndex={0}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round"
                d={open
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden bg-red-700 px-2 pb-3 pt-2 space-y-1" role="menu">
          <button
            className={`block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'home' ? 'underline text-green-400' : 'text-white'}`}
            onClick={() => {onNav('home'); setOpen(false);}}
            aria-current={current === 'home' ? "page" : undefined}
            role="menuitem"
          >Home</button>
          <button
            className={`block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'services' ? 'underline text-green-400' : 'text-white'}`}
            onClick={() => {onNav('services'); setOpen(false);}}
            aria-current={current === 'services' ? "page" : undefined}
            role="menuitem"
          >Services</button>
          {isAuthenticated ? (
            <>
              <button
                className={`block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'profile' ? 'underline text-green-400' : 'text-white'}`}
                onClick={() => {onNav('profile'); setOpen(false);}}
                aria-current={current === 'profile' ? "page" : undefined}
                role="menuitem"
              >Dashboard</button>
              <button
                className="block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 text-white"
                onClick={() => {onLogout(); setOpen(false);}}
                role="menuitem"
              >Logout</button>
            </>
          ) : (
            <button
              className={`block w-full text-left py-2 px-3 rounded hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${current === 'auth' ? 'underline text-green-400' : 'text-white'}`}
              onClick={() => {onNav('auth'); setOpen(false);}}
              aria-current={current === 'auth' ? "page" : undefined}
              role="menuitem"
            >Sign Up / Log In</button>
          )}
        </div>
      )}
      <div className="w-full h-0.5 bg-white" />
      <div className="w-full h-2 bg-green-700" />
    </nav>
  );
}

function Hero({ onCTAClick }) {
  return (
    <section
      className="relative flex flex-col justify-center items-center min-h-screen pt-16 overflow-hidden"
      id="hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')"
        }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-60" aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
          Empowering Kenyan Farmers
        </h1>
        <p className="text-lg md:text-xl text-green-100 mb-8 text-center max-w-xl drop-shadow">
          Agri-Link connects farmers and buyers across Kenya, making it easy to trade fresh produce, manage orders, and grow your agribusiness.
        </p>
        <button
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={onCTAClick}
          aria-label="View Services"
        >
          View Services
        </button>
      </div>
    </section>
  );
}

function Services() {
  const cards = [
    {
      title: "User Profiles",
      desc: "Farmers and buyers create profiles to showcase produce, business needs, and connect with the community.",
      icon: (
        <svg className="h-10 w-10 text-green-700 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Produce Listing",
      desc: "List, browse, and search for fresh produce. Farmers update availability, buyers find what they need.",
      icon: (
        <svg className="h-10 w-10 text-green-700 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      )
    },
    {
      title: "Order Management",
      desc: "Seamlessly manage orders, track status, and communicate between farmers and buyers.",
      icon: (
        <svg className="h-10 w-10 text-green-700 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    }
  ];
  return (
    <section className="py-20 bg-white" id="services" aria-label="Services">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="bg-green-50 rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow" tabIndex="0" aria-label={card.title}>
              {card.icon}
              <h3 className="text-xl font-semibold text-green-900 mb-2">{card.title}</h3>
              <p className="text-green-800">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthForm({ onAuth, isLogin, setIsLogin }) {
  const [userType, setUserType] = useState('farmer');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || (userType === 'seller' && !businessType) || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    onAuth({
      userType,
      name,
      location,
      businessType: userType === 'seller' ? businessType : undefined,
      password
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 pt-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
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
                  value="seller"
                  checked={userType === 'seller'}
                  onChange={() => setUserType('seller')}
                  className="form-radio text-green-700"
                />
                <span className="ml-2">Seller</span>
              </label>
            </div>
          </div>
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
          {userType === 'seller' && (
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

function AuthModal({ show, onClose, children }) {
  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-2 min-h-[22rem] flex flex-col justify-center animate-book-open"
        style={{
          animation: 'book-open 0.5s cubic-bezier(0.4,0,0.2,1) forwards',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          height: 'auto',
          maxHeight: '90vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-green-700 hover:text-green-900 text-2xl font-bold focus:outline-none"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
      <style>{`
        @keyframes book-open {
          0% {
            opacity: 0;
            transform: rotateY(60deg) translateX(200px) scale(0.95);
          }
          60% {
            opacity: 1;
            transform: rotateY(-10deg) translateX(0px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) translateX(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuth = (userData) => {
    setUser(userData);
    setPage('profile');
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setPage('home');
  };

  // Scroll to section for smooth navigation
  const handleNav = (target) => {
    if (target === 'auth') {
      setShowAuthModal(true);
      return;
    }
    setPage(target);
    if (target === 'services') {
      setTimeout(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (target === 'home') {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className="app-bg">
      {/* Overlay for readability */}
      <div className="app-overlay" />
      <div className="app-content">
        <Navbar onNav={handleNav} current={page} isAuthenticated={!!user} onLogout={handleLogout} />
        <main>
          {showAuthModal ? (
            <>
              <Hero onCTAClick={() => handleNav('services')} />
              <Services />
              <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)}>
                <AuthForm onAuth={handleAuth} isLogin={isLogin} setIsLogin={setIsLogin} />
              </AuthModal>
            </>
          ) : page === 'profile' && user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <>
              <Hero onCTAClick={() => handleNav('services')} />
              <Services />
            </>
          )}
        </main>
        <footer className="bg-green-700 text-white text-center py-4 mt-8 footer-green">
          &copy; {new Date().getFullYear()} Digi-Shamba. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;