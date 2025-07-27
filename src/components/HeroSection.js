import React from 'react';
import '../styles/hero-section.css';

const HeroSection = ({ title, subtitle, backgroundImage, buttonText, buttonLink }) => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {buttonText && buttonLink && (
          <a href={buttonLink} className="hero-button">
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

export default HeroSection;