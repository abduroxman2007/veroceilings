import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/home-contact-section.css';

const HomeContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="home-contact-section">
      <div className="container">
        <h2 className="home-contact-title">{t('home_contact.title')}</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>{t('home_contact.address_title')}</h3>
            <p>{t('home_contact.address')}</p>
            <h3>{t('home_contact.phone_title')}</h3>
            <p>{t('home_contact.phone1')}</p>
            <p>{t('home_contact.phone2')}</p>
            <h3>{t('home_contact.email_title')}</h3>
            <p>{t('home_contact.email')}</p>
          </div>
          <div className="contact-form">
            <h3>{t('home_contact.form_title')}</h3>
            <p>{t('home_contact.form_description')}</p>
            <form>
              <input type="text" placeholder={t('home_contact.name_placeholder')} />
              <input type="email" placeholder={t('home_contact.email_placeholder')} />
              <input type="text" placeholder={t('home_contact.subject_placeholder')} />
              <textarea placeholder={t('home_contact.message_placeholder')}></textarea>
              <button type="submit">{t('home_contact.button')}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
