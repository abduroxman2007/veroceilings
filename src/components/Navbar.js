import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/navbar.css';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/images/vero_ceiling.png';

function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Vero Ceilings Logo" style={{ width: '140px', height: 'auto' }} />
        </Link>
      </div>
      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li className="nav-item dropdown">
            <span className="nav-link">{t('navbar.products')}</span>
            <ul className="dropdown-menu">
              <li><Link to="/products/grilyato" className="dropdown-link"><span>Grilyato</span></Link></li>
              <li><Link to="/products/armstrong" className="dropdown-link"><span>Armstrong</span></Link></li>
              <li><Link to="/products/reyechniy" className="dropdown-link"><span>Reyechniy</span></Link></li>
              <li><Link to="/products/accessories" className="dropdown-link"><span>Accessories</span></Link></li>
            </ul>
          </li>
          <li className="nav-item"><Link to="/projects" className="nav-link">{t('navbar.projects')}</Link></li>
          <li className="nav-item"><Link to="/architects" className="nav-link">{t('navbar.architects')}</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">{t('navbar.about')}</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link">{t('navbar.contact')}</Link></li>
        </ul>
      </nav>
      <div className="navbar-right">
        <a href="/catalog.pdf" className="catalog-button">{t('navbar.catalog')}</a>
        <LanguageSwitcher dropdown label={<span className="lang-switcher-label">{t('navbar.language')}</span>} borderColorVar="--color-logo" />
        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;