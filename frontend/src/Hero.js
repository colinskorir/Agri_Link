import React from "react";

function Hero({ onCTAClick }) {
  return (
    <section
      className="relative flex flex-col justify-center items-center min-h-screen pt-16 overflow-hidden"
      id="hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundImage: "url('/Agriculture.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-60" aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <h1 className="text-4xl text-white mb-4 text-center drop-shadow-lg">
          Empowering Kenyan Farmers
        </h1>
        <p className="text-lg text-green-100 mb-8 text-center max-w-xl drop-shadow">
          Digi-shamba connects farmers and buyers across Kenya, making it easy to trade fresh produce, manage orders, and grow your agribusiness.
        </p>
        <button
          type="button"
          className="button-main bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-400 px-8 py-3 rounded-full text-lg shadow-lg transition-all duration-200"
          onClick={onCTAClick}
          aria-label="View Services"
        >
          View Services
        </button>
      </div>
    </section>
  );
}

export default Hero; 