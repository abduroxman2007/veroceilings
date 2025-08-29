import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/about-us.css';

// Image Imports
import storyImage from '../assets/images/aboutus/au0.jpg';

const AboutUsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="about-story-section">
      <div className="container">
        <h2 className="story-title">{t('about.story_title')}</h2>
        <div className="story-content">
          <div className="story-text">
            {t('about.story_text').split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="story-image-container">
            <img src={storyImage} alt={t("about.story_image_alt")} className="story-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
