import React from "react";
import BackgroundSlider from './BackgroundSlider';

function Hero({ onCTAClick }) {
  return (
    <section
      className="relative flex flex-col justify-center items-center min-h-screen pt-16 overflow-hidden"
      id="hero"
    >
      {/* Background image slider */}
      <BackgroundSlider />
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-60" aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
          Empowering Kenyan Farmers
        </h1>
        <p className="text-lg md:text-xl text-green-100 mb-8 text-center max-w-xl drop-shadow">
          Digi-shamba connects farmers and buyers across Kenya, making it easy to trade fresh produce, manage orders, and grow your agribusiness.
        </p>
        <a
          href="#services"
          className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="View Services"
        >
          View Services
        </a>
      </div>
    </section>
  );
}

export default Hero; 