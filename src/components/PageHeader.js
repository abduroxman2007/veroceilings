import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '../seo-schema';
import '../styles/page-header.css';

const PageHeader = ({ title, breadcrumbs, backgroundImage }) => {
  const { t } = useTranslation();

  // The visible trail and the structured-data trail are built from the same
  // source so they can never drift apart.
  const trail = [
    { name: t('navbar.home'), path: '/' },
    ...breadcrumbs.map((crumb) => ({ name: crumb.text, path: crumb.link })),
  ];

  return (
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
      <JsonLd id="ld-breadcrumb" schema={breadcrumbSchema(trail)} />
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container">
            <div className="carousel-caption text-start">
              <h1>{title}</h1>
              {/* An <ol> is not valid inside a <p> — the browser auto-closes the
                  paragraph and leaves the list orphaned outside it. Using a <nav>
                  keeps the DOM valid and gives the breadcrumb trail a landmark. */}
              <nav className="opacity-75" aria-label={t('navbar.home')}>
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;