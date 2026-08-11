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
    { src: airportproject, alt: 'Suspended metal ceiling system installed in an airport terminal' },
    { src: educationalproject, alt: 'Suspended ceiling installed in an educational building classroom' },
    { src: hotel, alt: 'Decorative suspended ceiling installed in a hotel lobby interior' },
    { src: officearmstrong, alt: 'Suspended Armstrong ceiling installed in a Tashkent office' },
    { src: officegrilyato, alt: 'Aluminium Grilyato cell ceiling installed in an open-plan office' },
    { src: officeslatceiling, alt: 'Aluminium slat ceiling installed in an office interior' },
    { src: restaurantproject, alt: 'Suspended ceiling installed in a restaurant dining hall' },
    { src: shopingcenter, alt: 'Suspended ceiling installed in a shopping centre retail hall' },
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
              <img src={image.src} alt={image.alt} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
      <ContactForm />
    </>
  );
}

export default Projects;
