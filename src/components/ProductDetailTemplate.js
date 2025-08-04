import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from './PageHeader';
import ContactForm from './ContactForm';
import '../styles/product-detail.css';

const ProductDetailTemplate = ({ product }) => {
  const { t } = useTranslation();

  const breadcrumbs = [
    { text: t('navbar.home'), link: '/' },
    { text: t('navbar.products'), link: '/products' },
    { text: product.name },
  ];

  return (
    <>
      <PageHeader
        title={product.name}
        breadcrumbs={breadcrumbs}
        backgroundImage={product.images.hero}
      />
      <div className="container marketing">
        <div className="product">
          <div className="product-description">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          <div className="product-image">
            <img src={product.images.main} alt={product.name} />
          </div>
        </div>
        <div className="product-card">
          {/* You can add the swiper component here if you want to replicate the slider */}
          <div className="product-dimension">
            <h1>{t('product_detail.dimensions')}</h1>
            <br />
            <table>
              <thead>
                <tr>
                  <th colSpan="1">
                    <h4>{t('product_detail.product')}</h4>
                  </th>
                  <th colSpan="3">
                    <h4>{t('product_detail.size')}</h4>
                  </th>
                </tr>
                <tr>
                  <td colSpan="1"><b>{t('product_detail.name')}</b></td>
                  <td colSpan="1"><b>{t('product_detail.width')}</b></td>
                  <td colSpan="1"><b>{t('product_detail.height')}</b></td>
                  <td colSpan="1"><b>{t('product_detail.length')}</b></td>
                </tr>
              </thead>
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.name}</td>
                    <td>{spec.width}</td>
                    <td>{spec.height}</td>
                    <td>{spec.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="application-cases-text">
          <h1>{t('product_detail.application_cases')}</h1>
          <p>{product.application_text}</p>
        </div>
        {/* You can add the swiper component here for application cases */}
      </div>
      <ContactForm />
    </>
  );
};

export default ProductDetailTemplate;