import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';
import '../styles/page-header.css';

const PageHeader = ({ title, breadcrumbs, backgroundImage }) => {
  const { t } = useTranslation();
  return (
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container">
            <div className="carousel-caption text-start">
              <h1>{title}</h1>
              <p className="opacity-75">
                <ol className="breadcrumb">
                  <li>
                    <Link to="/">
                      <FaHome />
                      &nbsp;{t('navbar.home')}&nbsp;/&nbsp;
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className={index === breadcrumbs.length - 1 ? 'active' : ''}>
                      {crumb.link ? <Link to={crumb.link}>{crumb.text}</Link> : crumb.text}
                    </li>
                  ))}
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;