// src/pages/ProductDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import products from '../product-data';
import PageHeader from '../components/PageHeader';
import '../styles/ProductDetails.css';
import bgImg from '../assets/images/slider/slid5.jpg';

function ProductDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>{t('products.not_found') || 'Product not found'}</h2>
      </div>
    );
  }

  const productSpecs = t(`products.${product.id}.specs`, { returnObjects: true });
  const relatedProducts = product.relatedProducts.map(relatedId => products.find(p => p.id === relatedId));

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
        <div className="product-details-image-slider">
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="product-details-swiper"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`${t(`products.${product.id}.title`)} ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-details-info">
          <h1>{t(`products.${product.id}.title`)}</h1>
          <p>{t(`products.${product.id}.description`)}</p>
          
          {productSpecs && typeof productSpecs === 'object' && (
            <div className="product-specs">
              <h2>{t('products.specs_title')}</h2>
              <ul>
                {Object.entries(productSpecs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{t(`products.spec_keys.${key}`)}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {product.applicationCases && product.applicationCases.length > 0 && (
        <div className="application-cases-section">
          <h2>{t('products.application_cases_title')}</h2>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            className="application-cases-swiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {product.applicationCases.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Application case ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* {product.video && (
        <div className="video-installation-section">
          <h2>{t('products.video_installation_title')}</h2>
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${product.video}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )} */}

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>{t('products.related_products_title')}</h2>
          <div className="related-products-container product-grid"> {/* Added product-grid class */}
            {relatedProducts.map(relatedProduct => (
              <div className="product-card" key={relatedProduct.id}> {/* Changed to div and added product-card class */}
                <Link to={`/products/${relatedProduct.id}`}>
                  <img src={relatedProduct.images[0]} alt={t(`products.${relatedProduct.id}.title`)} className="product-image" /> {/* Added product-image class */}
                  <h3 className="product-name">{t(`products.${relatedProduct.id}.title`)}</h3> {/* Added product-name class */}
                  <p className="product-description">{t(`products.${relatedProduct.id}.description`)}</p> {/* Added product-description class */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
