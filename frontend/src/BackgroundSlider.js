import React, { useState, useEffect, useRef } from 'react';
import './BackgroundSlider.css';

const images = [
  'https://i.pinimg.com/1200x/88/16/cf/8816cf6068763d7fc9f1b4d64c87de29.jpg',
  'https://i.pinimg.com/736x/f3/d4/9c/f3d49c7854aa7087e93f0a9df14653d5.jpg',
  process.env.PUBLIC_URL + '/Agriculture.jpg',
];

function BackgroundSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const startAutoSlide = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goToSlide = (idx) => {
    clearTimeout(timeoutRef.current);
    setCurrent(idx);
  };

  const nextSlide = () => {
    goToSlide((current + 1) % images.length);
  };
  const prevSlide = () => {
    goToSlide((current - 1 + images.length) % images.length);
  };

  return (
    <div className="background-slider">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`slide${idx === current ? ' active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
}

export default BackgroundSlider; 