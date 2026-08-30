// src/pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Link from '../components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import products from '../product-data';
import PageHeader from '../components/PageHeader';
import JsonLd from '../components/JsonLd';
import { productSchema } from '../seo-schema';
import '../styles/ProductDetails.css';
import bgImg from '../assets/images/slider/slid5.jpg';

function ProductDetails() {
  const { id, locale } = useParams();
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
      <JsonLd
        id="ld-product"
        schema={productSchema({
          name: t(`products.${product.id}.title`),
          description: t(`products.${product.id}.description`),
          images: product.images,
          url: `/${locale}/products/${product.id}`,
          sku: product.id,
        })}
      />
      <PageHeader
        title={t(`products.${product.id}.title`)}
        breadcrumbs={[
          { text: t('navbar.products'), link: '/products' },
          { text: t(`products.${product.id}.title`) }
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
                <img
                  src={image}
                  // Per-image alt strings can be supplied per language under
                  // products.<id>.image_alts; the fallback is still keyword-
                  // bearing rather than the old "Title 1" / "Title 2".
                  alt={t(`products.${product.id}.image_alts.${index}`, {
                    defaultValue: `${t(`products.${product.id}.title`)} — Vero Ceilings, Toshkent`,
                  })}
                  width="800"
                  height="600"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-details-info">
          <h2>{t(`products.${product.id}.title`)}</h2>
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

          <div
            className="product-order-cta"
            style={{
              marginTop: '24px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#1e293b' }}>
              {t('products.order_cta_title')}
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '16px' }}>
              {t('products.order_cta_text')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <a
                href="tel:+998783337377"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#19193f',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                }}
              >
                📞 +998 78 333 73 77
              </a>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#f1f5f9',
                  color: '#1e293b',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                }}
              >
                {t('products.order_cta_button')} →
              </Link>
            </div>
          </div>
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
                <img
                  src={image}
                  alt={t(`products.${product.id}.application_alts.${index}`, {
                    defaultValue: `${t(`products.${product.id}.title`)} — ${t('products.application_cases_title')}`,
                  })}
                  width="600"
                  height="400"
                  loading="lazy"
                />
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
                  <img src={relatedProduct.images[0]} alt={t(`products.${relatedProduct.id}.title`)} className="product-image" loading="lazy" /> {/* Added product-image class */}
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
