import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { FaMapMarkedAlt } from 'react-icons/fa';
import '../styles/contact-page.css';
import slid7 from '../assets/images/slider/slid7.jpg'; // Ensure you have the correct path for the background image

function Contact() {
  const { t } = useTranslation();

  const breadcrumbs = [
    { text: t('navbar.home'), link: '/' },
    { text: t('navbar.contact') },
  ];

  return (
    <>
      <PageHeader
        title={t('contact.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={slid7}
      />
      <div className="contact-page-wrapper">
        <div className="contact-page-container">
          <div className="contact-form-section">
            <ContactForm />
          </div>
          <div className="map-section">
            <div className="map-placeholder">
              <FaMapMarkedAlt />
              <h3>{t('contact.view_map')}</h3>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1646.5259011071116!2d69.18366543190743!3d41.236734951944584!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE0JzEzLjIiTiA2OcKwMTEnMDYuOCJF!5e0!3m2!1sru!2s!4v1707317196583!5m2!1sru!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;