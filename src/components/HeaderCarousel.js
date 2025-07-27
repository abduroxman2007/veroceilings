import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/carousel.css';

// Image Imports for HeroSection
import slide1Bg from '../assets/images/slider/slid3.jpg';
import slide2Bg from '../assets/images/slider/slid2.jpg';
import slide3Bg from '../assets/images/slider/slid1.jpg';

const HeaderCarousel = () => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      backgroundImage: slide1Bg,
      title: t('hero.slide1.title'),
      text: t('hero.slide1.text'),
      buttonText: t('hero.slide1.button'),
      buttonLink: '/about',
    },
    {
      id: 2,
      backgroundImage: slide2Bg,
      title: t('hero.slide2.title'),
      text: t('hero.slide2.text'),
      buttonText: t('hero.slide2.button'),
      buttonLink: '/products',
    },
    {
      id: 3,
      backgroundImage: slide3Bg,
      title: t('hero.slide3.title'),
      text: t('hero.slide3.text'),
      buttonText: t('hero.slide3.button'),
      buttonLink: '/gallery',
    },
  ];

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 12000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      speed={1500}
      className="mySwiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="hero-section"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.text}</p>
              <a href={slide.buttonLink} className="hero-button">
                {slide.buttonText}
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderCarousel;
