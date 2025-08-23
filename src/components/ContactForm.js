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
          <form>
            <div className="form-row">
              <input type="text" placeholder={t('contact.form.name')} />
              <input type="text" placeholder={t('contact.form.phone')} />
            </div>
            <div className="form-row">
              <input type="email" placeholder={t('contact.form.email')} />
              <input type="text" placeholder={t('contact.form.subject')} />
            </div>
            <textarea placeholder={t('contact.form.message')}></textarea>
            <button type="submit">{t('contact.form.send')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;  