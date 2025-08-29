import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';

import lightGallery from 'lightgallery';

// Plugins (autoplay is skipped due to bug)
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';

// Styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-rotate.css';
import 'lightgallery/css/lg-share.css';

import '../styles/projects-page.css';

// Image imports
import airportproject from '../assets/images/slider/slid6.jpg';

import educationalproject from '../assets/images/project gallery/educationalproject.png';
import hotel from '../assets/images/project gallery/hotel.jpg';
import officearmstrong from '../assets/images/project gallery/office-armstrong.jpg';
import officegrilyato from '../assets/images/project gallery/office-grilyato.jpg';
import officeslatceiling from '../assets/images/project gallery/office-slatceiling.jpg';
import restaurantproject from '../assets/images/project gallery/restaurantproject.jpg';
import shopingcenter from '../assets/images/project gallery/shoping-center.jpg';

function Projects() {
  const { t } = useTranslation();
  const galleryRef = useRef(null);
  const lgInstanceRef = useRef(null);

  useEffect(() => {
    const initGallery = () => {
      if (galleryRef.current && !lgInstanceRef.current) {
        lgInstanceRef.current = lightGallery(galleryRef.current, {
          plugins: [lgThumbnail, lgZoom, lgFullscreen, lgRotate, lgShare],
          speed: 500,
          download: false,
        });
      }
    };

    // Timeout ensures DOM is rendered before init
    const timer = setTimeout(initGallery, 0);

    return () => {
      clearTimeout(timer);
      if (lgInstanceRef.current) {
        lgInstanceRef.current.destroy();
        lgInstanceRef.current = null;
      }
    };
  }, []);

  const breadcrumbs = [
    // { text: t('navbar.home'), link: '/' },
    { text: t('navbar.projects') },
  ];

  const galleryImages = [
    { src: airportproject, alt: 'Airport Project' },
    { src: educationalproject, alt: 'Educational Project' },
    { src: hotel, alt: 'Hotel' },
    { src: officearmstrong, alt: 'Office Armstrong' },
    { src: officegrilyato, alt: 'Office Grilyato' },
    { src: officeslatceiling, alt: 'Office Slat Ceiling' },
    { src: restaurantproject, alt: 'Restaurant Project' },
    { src: shopingcenter, alt: 'Shopping Center' },
  ];

  return (
    <>
      <PageHeader
        title={t('projects.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={airportproject}
      />
      <div className="projects-page-content">
        <div id="gallery-container" className="gallery" ref={galleryRef}>
          {galleryImages.map((image, index) => (
            <a key={index} href={image.src}>
              <img src={image.src} alt={image.alt} />
            </a>
          ))}
        </div>
      </div>
      <ContactForm />
    </>
  );
}

export default Projects;
