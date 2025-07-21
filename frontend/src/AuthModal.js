import React, { useEffect } from "react";

function AuthModal({ show, onClose, children }) {
  useEffect(() => {
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
        className="relative bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-2 min-h-[22rem] flex flex-col justify-center animate-book-open transform-style-preserve-3d perspective-1000px"
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
    </div>
  );
}

export default AuthModal; 