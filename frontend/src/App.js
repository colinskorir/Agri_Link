import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import AuthForm from "./AuthForm";
import Dashboard from "./Dashboard";
import AuthModal from "./AuthModal";

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
