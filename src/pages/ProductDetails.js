// src/pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import products from '../product-data';
import PageHeader from '../components/PageHeader';
import '../styles/ProductDetails.css'; // Ensure you have styles for the product details
import bgImg from '../assets/images/slider/slid5.jpg';

function ProductDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  // Find product by id
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>{t('products.not_found') || 'Product not found'}</h2>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={t(`products.${product.id}.title`)}
        breadcrumbs={[
          { text: t('navbar.products'), link: '/products' },
          { text: t(`products.${product.id}.title`), link: `/products/${product.id}` }
        ]}
        backgroundImage={bgImg}
      />

      <div className="product-details-container">
        <div className="product-details-image">
          <img src={product.images[0]} alt={t(`products.${product.id}.title`)} />
        </div>
        <div className="product-details-info">
          <h1>{t(`products.${product.id}.title`)}</h1>
          <p>{t(`products.${product.id}.description`)}</p>
          {/* Example: add specs or more images */}
          {product.specs && (
            <ul>
              {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
