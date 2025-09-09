import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h5>{t('footer.links.title')}</h5>
            <ul>
              <li><Link to="/">{t('footer.links.home')}</Link></li>
              <li><Link to="/about">{t('footer.links.about')}</Link></li>
              <li><Link to="/products">{t('footer.links.products')}</Link></li>
              <li><Link to="/projects">{t('footer.links.projects')}</Link></li>
              <li><Link to="/contact">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>{t('footer.products.title')}</h5>
            <ul>
              <li><Link to="/products/metalarmstrong">{t('footer.products.metal_armstrong.title')}</Link></li>
              <li><Link to="/products/gypsumarmstrong">{t('footer.products.gypsum_armstrong.title')}</Link></li>
              <li><Link to="/products/washingarmstrong">{t('footer.products.washing_armstrong.title')}</Link></li>
              <li><Link to="/products/grilyato">{t('footer.products.grilyato.title')}</Link></li>
              <li><Link to="/products/slatceiling">{t('footer.products.slat_ceiling.title')}</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>{t('footer.contact.title')}</h5>
            <ul>
              <li>{t('footer.contact.address')}</li>
              <li><a href={`tel:${t('footer.contact.phone1')}`}>{t('footer.contact.phone1')}</a></li>
              <li><a href={`tel:${t('footer.contact.phone2')}`}>{t('footer.contact.phone2')}</a></li>
              <li><a href={`mailto:${t('footer.contact.email')}`}>{t('footer.contact.email')}</a></li>
              <li><a href={`http://${t('footer.contact.website')}`}>{t('footer.contact.website')}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>{t('footer.newsletter.title')}</h5>
            <p>{t('footer.newsletter.description')}</p>
            <form action="https://formsubmit.co/veroceiling.ft@gmail.com" method="POST">
              <input type="email" name="email" placeholder={t('footer.newsletter.placeholder')} required />
              <button type="submit">{t('footer.newsletter.button')}</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vero Ceiling Company, Inc. {t('footer.rights')}</p>
          <div className="social-icons">
            <a href="https://t.me/VeroCeilings"><FaTelegram /></a>
            <a href="https://www.instagram.com/vero_ceiling.uz/"><FaInstagram /></a>
            <a href="https://www.facebook.com/people/Vero-Rasmiy-sahifa/61554402564771/"><FaFacebook /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;