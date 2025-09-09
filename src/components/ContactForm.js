import React, { useState } from 'react';
import '../styles/contact.css'; // Import the new CSS file
import { useTranslation } from 'react-i18next';

import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

function ContactForm() {
  const { t } = useTranslation();

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        {/* Left Side - Info */}
        <div className="contact-details">
          <h4>{t('contact.title')}</h4>
          <h2>{t('contact.subtitle')}</h2>
          <p><FaPhoneAlt className="icon" /> {t('contact.phone')}</p>
          <p><FaEnvelope className="icon" /> {t('contact.email')}</p>
          <p><FaGlobe className="icon" /> {t('contact.website')}</p>
        </div>

        {/* Right Side - Form */}
        <div className="contact-form">
          <form action="https://formsubmit.co/veroceiling.ft@gmail.com" method="POST">
            <div className="form-row">
              <input type="text" name="name" placeholder={t('contact.form.name')} required />
              <input type="text" name="phone" placeholder={t('contact.form.phone')} required />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder={t('contact.form.email')} required />
              <input type="text" name="subject" placeholder={t('contact.form.subject')} required />
            </div>
            <textarea name="message" placeholder={t('contact.form.message')}></textarea>
            <button type="submit">{t('contact.form.send')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;  