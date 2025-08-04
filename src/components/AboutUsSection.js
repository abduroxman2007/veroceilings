import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/about-us.css';

// Image Imports
import storyImage from '../assets/images/aboutus/au1.jpg';

const AboutUsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="about-story-section">
      <div className="container">
        <h2 className="story-title">{t('about.story_title')}</h2>
        <div className="story-content">
          <div className="story-text">
            <p>{t('about.story_paragraph_new_1')}</p>
            <p>{t('about.story_paragraph_new_2')}</p>
            <p>{t('about.story_paragraph_new_3')}</p>
            <p>{t('about.story_paragraph_new_4')}</p>
          </div>
          <div className="story-image-container">
            <img src={storyImage} alt="Our Story" className="story-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
