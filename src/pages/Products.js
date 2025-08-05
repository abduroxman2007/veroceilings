import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import ContactForm from '../components/ContactForm';
import '../styles/products-page.css';
import products from '../product-data';

// Image Imports
import bgImg from '../assets/images/slider/slid5.jpg';

function Products() {
  const { t } = useTranslation();

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
              <ProductCard key={index} name={t(`products.${product.id}.title`)} image={product.images[0]} link={`/products/${product.id}`} />
            ))}
          </div>
        </section>
      </div>
      <ContactForm />
    </>
  );
}

export default Products;