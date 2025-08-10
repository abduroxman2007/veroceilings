import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css'; // Ensure you have styles for the product card

function ProductCard({ name, description, image, link }) {
  return (
    <div className="product-card">
      <Link to={link}>
        <img src={image} alt={name} className="product-image" />
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
