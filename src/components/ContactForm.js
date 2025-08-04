import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react'; // Using lucide-react for icons
import '../styles/contact.css'; // Import the new CSS file
import { useTranslation } from 'react-i18next';

// Main App component that renders the ContactSection
export default function App() {
  return (
    <div className="app-container">
      <ContactSection />
    </div>
  );
}

function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState(''); // State for status messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(t('contact.status_sending'));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setStatusMessage(t('contact.status_success'));
        setFormData({ name: '', phone: '', email: '', message: '' }); // Clear form
      } else {
        setStatusMessage(t('contact.status_error'));
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      setStatusMessage(t('contact.status_error_generic'));
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="contact-section-wrapper">
      <div className="glass-card">
        {/* Left Column: Contact Information */}
        <div className="contact-info-column">
          <h2 className="contact-title">{t('contact.get_in_touch')}</h2>
          <p className="contact-description">
            {t('contact.form_description_new')}
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <Phone size={24} className="accent-icon" />
              <span className="contact-text">{t('contact.phone_number')}</span>
            </div>
            <div className="contact-item">
              <Mail size={24} className="accent-icon" />
              <span className="contact-text">{t('contact.email_address')}</span>
            </div>
            <div className="contact-item">
              <MapPin size={24} className="accent-icon" />
              <span className="contact-text">{t('contact.location')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Input Form */}
        <div className="contact-form-column">
          <form
            onSubmit={handleSubmit}
            className="contact-form"
            name="contact" // Netlify form name
            method="POST" // Netlify method
            data-netlify="true" // Netlify attribute
          >
            {/* Hidden input for Netlify form identification */}
            <input type="hidden" name="form-name" value="contact" />

            {/* Name and Phone inputs in one row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {t('contact.name_label')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.name_placeholder_new')}
                  className="input-glass"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  {t('contact.phone_label')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact.phone_placeholder_new')}
                  className="input-glass"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t('contact.email_label')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email_placeholder_new')}
                className="input-glass"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                {t('contact.message_label')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder={t('contact.message_placeholder_new')}
                className="input-glass textarea-glass"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-button"
            >
              {t('contact.send_button')}
            </button>
            {statusMessage && (
              <p className="status-message">{statusMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
