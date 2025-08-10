import React, { useState } from 'react';
import '../styles/contact.css'; // Import the new CSS file
import { useTranslation } from 'react-i18next';

import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

function ContactForm() {
  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        {/* Left Side - Info */}
        <div className="contact-details">
          <h4>CONTACT US</h4>
          <h2>Feel free to keep in touch with us!</h2>
          <p><FaPhoneAlt className="icon" /> 010-020-0860</p>
          <p><FaEnvelope className="icon" /> info@company.com</p>
          <p><FaGlobe className="icon" /> www.company.com</p>
        </div>

        {/* Right Side - Form */}
        <div className="contact-form">
          <form>
            <div className="form-row">
              <input type="text" placeholder="Your Name" />
              <input type="text" placeholder="Your Phone" />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Your Email" />
              <input type="text" placeholder="Subject" />
            </div>
            <textarea placeholder="Message"></textarea>
            <button type="submit">SEND MESSAGE NOW</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;  