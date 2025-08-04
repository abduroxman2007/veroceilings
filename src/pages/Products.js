import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import ContactForm from '../components/ContactForm';
import '../styles/products-page.css';

// Image Imports
import bgImg from '../assets/images/slider/slid5.jpg';
import grilyatoImg from '../assets/images/products/grilyato/grilyato1.jpg';
import armstrongImg from '../assets/images/products/armstrong/armstrong1.jpg';
import reyechniyImg from '../assets/images/products/reyechniy/reyechniy.png';
import tProfilImg from '../assets/images/products/profils/t-profil/t-profil1.jpg';
import lProfilImg from '../assets/images/products/profils/l-profil/l-profil1.jpg';
import suspensionImg from '../assets/images/products/stringer/s1.jpg'; // Using stringer as placeholder

function Products() {
  const { t } = useTranslation();

  const products = [
    { name: t('products.grilyato.title'), image: grilyatoImg, link: '/products/grilyato' },
    { name: t('products.armstrong.title'), image: armstrongImg, link: '/products/armstrong' },
    { name: t('products.reyechniy.title'), image: reyechniyImg, link: '/products/reyechniy' },
  ];

  const accessories = [
    { name: t('products.t_profil.title'), image: tProfilImg, link: '/products/t-profil' },
    { name: t('products.l_profil.title'), image: lProfilImg, link: '/products/l-profil' },
    { name: t('products.stringer.title'), image: suspensionImg, link: '/products/suspension' },
  ];

  const breadcrumbs = [
    { text: t('navbar.products'), link: '/products' },
  ];

  return (
    <>
      <PageHeader
        title={t('products.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={bgImg} // Placeholder, can be changed
      />
      <div className="products-page-content">
        <section className="products-section">
          <h2>{t('products.products_section_title')}</h2>
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </section>
        <section className="products-section">
          <h2>{t('products.accessories_section_title')}</h2>
          <div className="product-grid">
            {accessories.map((accessory, index) => (
              <ProductCard key={index} {...accessory} />
            ))}
          </div>
        </section>
      </div>
      <ContactForm />
    </>
  );
}

export default Products;