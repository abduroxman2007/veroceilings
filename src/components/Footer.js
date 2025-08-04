import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
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
              <li><a href="/">{t('footer.links.home')}</a></li>
              <li><a href="/about">{t('footer.links.about')}</a></li>
              <li><a href="/products">{t('footer.links.products')}</a></li>
              <li><a href="/gallery">{t('footer.links.projects')}</a></li>
              <li><a href="/contact">{t('footer.links.contact')}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>{t('footer.products.title')}</h5>
            <ul>
              <li><a href="/products/metal-armstrong">{t('footer.products.metal_armstrong.title')}</a></li>
              <li><a href="/products/gypsum-armstrong">{t('footer.products.gypsum_armstrong.title')}</a></li>
              <li><a href="/products/washing-armstrong">{t('footer.products.washing_armstrong.title')}</a></li>
              <li><a href="/products/grilyato">{t('footer.products.grilyato.title')}</a></li>
              <li><a href="/products/slat-ceiling">{t('footer.products.slat_ceiling.title')}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>{t('footer.contact.title')}</h5>
            <ul>
              <li>{t('footer.contact.address')}</li>
              <li><a href="tel:+998900981110">{t('footer.contact.phone1')}</a></li>
              <li><a href="tel:+998901091110">{t('footer.contact.phone2')}</a></li>
              <li><a href="mailto:veroceilingsuz@gmail.com">{t('footer.contact.email')}</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>{t('footer.newsletter.title')}</h5>
            <p>{t('footer.newsletter.description')}</p>
            <form>
              <input type="email" placeholder={t('footer.newsletter.placeholder')} />
              <button type="submit">{t('footer.newsletter.button')}</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vero Ceiling Company, Inc. {t('footer.rights')}</p>
          <div className="social-icons">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;