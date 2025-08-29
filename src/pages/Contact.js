import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { FaMapMarkedAlt } from 'react-icons/fa';
import '../styles/contact-page.css';
import slid9 from '../assets/images/slider/slid10.png'; // Ensure path is correct

function Contact() {
  const { t } = useTranslation();

  const breadcrumbs = [
    // { text: t('navbar.home'), link: '/' },
    { text: t('navbar.contact') },
  ];

  return (
    <>
      <PageHeader
        title={t('contact.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={slid9}
      />
      <div className="contact-page-wrapper">
        <div className="contact-page-container">
          <div className="contact-form-section">
            <ContactForm />
          </div>
          <div className="map-section">
            <iframe
              src="https://www.google.com/maps/embed?...your-link..."
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