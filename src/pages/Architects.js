import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import '../styles/architects.css';
import bgImg from '../assets/images/slider/slid3.jpg';

function Architects() {
  const { t } = useTranslation();

  const breadcrumbs = [{ text: t('navbar.architects'), link: '/architects' }];

  const videos = [
    {
      id: 'E_M4s_R_3_E',
      title: t('architects.video1.title'),
      description: t('architects.video1.description'),
    },
    {
      id: 'k6Kujh_hHwI',
      title: t('architects.video2.title'),
      description: t('architects.video2.description'),
    },
    {
      id: 'zK4iA4O70P4',
      title: t('architects.video3.title'),
      description: t('architects.video3.description'),
    },
    {
        id: 'zK4iA4O70P4',
        title: t('architects.video4.title'),
        description: t('architects.video4.description'),
    },
    {
        id: 'zK4iA4O70P4',
        title: t('architects.video5.title'),
        description: t('architects.video5.description'),
    },
    {
        id: 'zK4iA4O70P4',
        title: t('architects.video6.title'),
        description: t('architects.video6.description'),
    },
  ];

  return (
    <main>
      <PageHeader
        title={t('architects.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={bgImg}
      />

      <section className="video-library-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('architects.library_title')}</h2>
            <p>{t('architects.library_description')}</p>
          </div>
          <div className="video-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="video-thumbnail-link">
                  <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} className="video-thumbnail" />
                  <div className="play-icon"></div>
                </a>
                <div className="video-card-content">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Architects;
