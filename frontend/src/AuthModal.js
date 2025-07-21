import React from "react";

function AuthModal({ show, onClose, children }) {
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
      className="modal-overlay"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-green-700 hover:text-green-900 text-2xl font-bold focus-outline-none"
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