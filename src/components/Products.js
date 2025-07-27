import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCube } from 'react-icons/fa';
import '../styles/products.css';

// Image Imports
import grilyatoImg from '../assets/images/products/grilyato/grilyato1.jpg';
import gypsumArmstrongImg from '../assets/images/products/armstrong/gypsumarmstrong/gypsumarmstrong1.png';
import metalArmstrongImg from '../assets/images/products/armstrong/metalarmstrong/metalarmstrong1.png';
import washingArmstrongImg from '../assets/images/products/armstrong/washingarmstrong/wa2.jpg';
import reyechniyImg from '../assets/images/products/reyechniy/reyechniy.png';
import tProfilImg from '../assets/images/products/profils/t-profil/t-profil1.jpg';
import lProfilImg from '../assets/images/products/profils/l-profil/l-profil1.jpg';
import stringerImg from '../assets/images/products/stringer/s1.jpg';
import honeycombImg from '../assets/images/products/honeycomb/honeycomb.png';
import aquaPanelImg from '../assets/images/products/paneli/aqua-panel1.jpg';

const products = [
  { key: 'grilyato', image: grilyatoImg },
  { key: 'gypsum_armstrong', image: gypsumArmstrongImg },
  { key: 'metal_armstrong', image: metalArmstrongImg },
  { key: 'washing_armstrong', image: washingArmstrongImg },
  { key: 'reyechniy', image: reyechniyImg },
  { key: 't_profil', image: tProfilImg },
  { key: 'l_profil', image: lProfilImg },
  { key: 'stringer', image: stringerImg },
  { key: 'honeycomb', image: honeycombImg },
  { key: 'aqua_panel', image: aquaPanelImg },
];

const Products = () => {
  const { t } = useTranslation();

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">
        <FaCube className="carousel-icon" /> {t('products.title')}
      </h2>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {products.map((product, index) => (
            <div className="carousel-card" key={`product-${index}`}>
              <img src={product.image} alt={t(`products.${product.key}.title`)} />
              <h3>{t(`products.${product.key}.title`)}</h3>
              <p>{t(`products.${product.key}.description`)}</p>
            </div>
          ))}
          {products.map((product, index) => (
            <div className="carousel-card" key={`product-duplicate-${index}`}>
              <img src={product.image} alt={t(`products.${product.key}.title`)} />
              <h3>{t(`products.${product.key}.title`)}</h3>
              <p>{t(`products.${product.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;