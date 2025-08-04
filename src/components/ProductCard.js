import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product-card.css';

const ProductCard = ({ name, image, link }) => {
  return (
    <Link to={link} className="product-card-link">
      <div className="product-card-glass">
        <img src={image} alt={name} className="product-card-image" />
        <div className="product-card-overlay">
          <h3>{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;