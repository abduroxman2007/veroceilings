import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { FaMapMarkedAlt } from 'react-icons/fa';
import '../styles/contact-page.css';
import slid9 from '../assets/images/slider/slid9.png'; // Ensure path is correct

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
        backgroundImage={slid9}
      />
      <div className="contact-page-wrapper">
        <div className="contact-page-container">
            <ContactForm />
          {/* <div className="contact-form-section"> */}
          {/* </div>  */}
          <div className="map-section">
            {/* IMPORTANT: Replace the src below with your own Google Maps embed link.
              You can get this by:
              1. Going to Google Maps and finding your location.
              2. Clicking "Share".
              3. Selecting the "Embed a map" tab.
              4. Copying the HTML and extracting the URL from the `src` attribute.
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0863999999997!2d144.9537353153169!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f115555%3A0x5045675218ce7e0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau"
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