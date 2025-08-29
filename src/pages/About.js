import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import '../styles/about-page.css';

import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import WhyUsSection from '../components/WhyUsSection';
import AboutUsSection from '../components/AboutUsSection';

import slider from '../assets/images/slider/slid1.jpg';
import aboutImg0 from '../assets/images/aboutus/au0.jpg';
import aboutImg1 from '../assets/images/aboutus/au1.jpg';
import aboutImg2 from '../assets/images/aboutus/au2.jpg';
import aboutImg3 from '../assets/images/aboutus/au3.jpg';
import aboutImg4 from '../assets/images/aboutus/au4.jpg';
import aboutImg5 from '../assets/images/aboutus/au5.jpg';
import aboutImg6 from '../assets/images/aboutus/au6.jpg';

const AboutUs = () => {

    const { t } = useTranslation();

    const breadcrumbs = [
        { text: t('navbar.about') },
    ];

    return (

        <main>
            <PageHeader
                title={t('about.page_title')}
                breadcrumbs={breadcrumbs}
                backgroundImage={slider}
            />
            <WhyUsSection />

            <section className="about-us-sections">
                <div className="container">
                    {/* Section 1: Images */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-8">
                            <img src={aboutImg0} alt="Vero Group Factory" className="img-fluid small-image-left" />
                        </div>
                        <div className="col-md-4">
                            <img src={aboutImg6} alt="Vero Group Leadership" className="img-fluid small-image-right" />
                        </div>
                    </div>

                    {/* Section 2: Text */}
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="text-center">
                                <h2 className="mb-4">{t('about.title')}</h2>
                                <p>{t('about.paragraph1')}</p>
                                <p>{t('about.paragraph2')}</p>
                                <p>{t('about.paragraph3')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Swiper */}
                    <div className="row">
                        <div className="col-12">
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={10}
                                autoplay={{
                                    delay: 1500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                
                                modules={[Autoplay, Pagination]}
                                className="mySwiper_about"
                            >
                                <SwiperSlide>
                                    <img src={aboutImg2} alt="Leadership Team" className="img-fluid" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={aboutImg3} alt="Warehouse Interior" className="img-fluid" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={aboutImg4} alt="Product Detail" className="img-fluid" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={aboutImg5} alt="Another Product View" className="img-fluid" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <AboutUsSection />
            <ContactForm />
        </main>
    );
};

export default AboutUs;