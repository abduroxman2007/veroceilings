import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import '../styles/about-page.css';

// Image Imports
import slider from '../assets/images/slider/slid1.jpg';
import aboutImg0 from '../assets/images/aboutus/au0.jpg';
import aboutImg1 from '../assets/images/aboutus/au1.jpg';
import aboutImg2 from '../assets/images/aboutus/au2.jpg';
import aboutImg3 from '../assets/images/aboutus/au3.jpg';
import aboutImg4 from '../assets/images/aboutus/au4.jpg';
import aboutImg5 from '../assets/images/aboutus/au5.jpg';
import aboutImg6 from '../assets/images/aboutus/au6.jpg';

function About() {
  const { t } = useTranslation();

  const breadcrumbs = [
    { text: t('navbar.home'), link: '/' },
    { text: t('navbar.about') },
  ];

  return (
    <>
      <PageHeader
        title={t('about.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={slider} // Using one of the about images as hero background
      />
      <div className="container marketing">
        <div className="about-intro">
          <h1>{t('about.intro_title')}</h1>
          <p>{t('about.intro_text')}</p>
        </div>

        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="cb" data-max="1700">
              <h3 className="fs-1 text-body-emphasis counter-number">1700+</h3>
              <h3 className="fs-3 text-body-emphasis">{t('about.counter1_title')}</h3>
              <p>{t('about.counter1_text')}</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="cb" data-max="200">
              <h3 className="fs-1 text-body-emphasis counter-number">200+</h3>
              <h3 className="fs-3 text-body-emphasis">{t('about.counter2_title')}</h3>
              <p>{t('about.counter2_text')}</p>
            </div>
          </div>
          <div className="col d-flex align-items-start ">
            <div className="cb" data-max="120">
              <h3 className="fs-1 text-body-emphasis counter-number">120+</h3>
              <h3 className="fs-3 text-body-emphasis">{t('about.counter3_title')}</h3>
              <p>{t('about.counter3_text')}</p>
            </div>
          </div>
        </div>

        <div className="duo-images">
          <div className="image1-box">
            <img className="image" src={aboutImg1} alt="About us 1" />
          </div>
          <div className="image2-box">
            <img className="image" src={aboutImg6} alt="About us 2" />
          </div>
        </div>

        <div className="aboutustext">
          <h1>{t('about.story_title')}</h1>
          <p>{t('about.story_text')}</p>
        </div>

        <div className="about-card">
          <div className="text-card">
            <h2>{t('about.vision_title')}</h2>
            <p>{t('about.vision_text')}</p>
          </div>
          <div className="image-card">
            <img src={aboutImg0} alt="Building" />
          </div>
        </div>
      </div>
      <ContactForm />
    </>
  );
}

export default About;