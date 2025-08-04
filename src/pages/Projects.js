import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-rotate.css';
import 'lightgallery/css/lg-share.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';
import '../styles/projects-page.css';

// Image Imports
import airportproject from '../assets/images/project gallery/airportproject.jpg';
import educationalproject from '../assets/images/project gallery/educationalproject.png';
import hotel from '../assets/images/project gallery/hotel.jpg';
import officearmstrong from '../assets/images/project gallery/office-armstrong.jpg';
import officegrilyato from '../assets/images/project gallery/office-grilyato.jpg';
import officeslatceiling from '../assets/images/project gallery/office-slatceiling.jpg';
import restaurantproject from '../assets/images/project gallery/restaurantproject.jpg';
import shopingcenter from '../assets/images/project gallery/shoping-center.jpg';

function Projects() {
  const { t } = useTranslation();

  useEffect(() => {
    lightGallery(document.getElementById('gallery-container'), {
      plugins: [lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare],
      speed: 500,
    });
  }, []);

  const breadcrumbs = [
    { text: t('navbar.home'), link: '/' },
    { text: t('navbar.projects') },
  ];

  const galleryImages = [
    { thumb: airportproject, full: airportproject },
    { thumb: educationalproject, full: educationalproject },
    { thumb: hotel, full: hotel },
    { thumb: officearmstrong, full: officearmstrong },
    { thumb: officegrilyato, full: officegrilyato },
    { thumb: officeslatceiling, full: officeslatceiling },
    { thumb: restaurantproject, full: restaurantproject },
    { thumb: shopingcenter, full: shopingcenter },
  ];

  return (
    <>
      <PageHeader
        title={t('projects.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={airportproject} // Using one of the project images as hero background
      />
      <div className="projects-page-content">
        <div id="gallery-container" className="gallery">
          {galleryImages.map((image, index) => (
            <a key={index} href={image.full}>
              <img src={image.thumb} alt={`Project ${index + 1}`} />
            </a>
          ))}
        </div>
      </div>
      <ContactForm />
    </>
  );
}

export default Projects;