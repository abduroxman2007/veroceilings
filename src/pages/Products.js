import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import ProductCard from '../components/ProductsCard';
import bgImg from '../assets/images/slider/slid5.jpg';
import '../styles/products-page.css'; // Ensure you have styles for the products page
import products from '../product-data'; // Make sure this file contains product objects with {id, category, images, description}

function Products() {
  const { t } = useTranslation();

  const breadcrumbs = [
    { text: t('navbar.products'), link: '/products' },
  ];

  // Separate products into categories
  const mainProducts = products.filter(p => p.category === 'product');
  const accessories = products.filter(p => p.category === 'accessory');

  return (
    <>
      <PageHeader
        title={t('products.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={bgImg}
      />

      <div className="products-page-content">
        {/* Main Products Section */}
        <section className="products-section">
          <h2 className="section-title">{t('products.products_section_title')}</h2>
          <div className="product-grid">
            {mainProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={t(`products.${product.id}.title`)}
                description={t(`products.${product.id}.description`)}
                image={product.images[0]}
                link={`/products/${product.id}`}
              />
            ))}
          </div>
        </section>

        {/* Accessories Section */}
        <section className="products-section">
          <h2 className="section-title">{t('products.accessories_section_title')}</h2>
          <div className="product-grid">
            {accessories.map((product, index) => (
              <ProductCard
                key={index}
                name={t(`products.${product.id}.title`)}
                description={t(`products.${product.id}.description`)}
                image={product.images[0]}
                link={`/products/${product.id}`}
              />
            ))}
          </div>
        </section>
      </div>

      <ContactForm />
    </>
  );
}

export default Products;
