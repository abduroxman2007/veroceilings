import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
// import WhyUsSection from '../components/WhyUsSection';

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
      { text: t('navbar.about'), link: '/' },
      { text: t('navbar.about') },
    ];

  return (
    
    <main>
      <PageHeader
        title={t('contact.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={slider}
      />


      {/* <WhyUsSection /> */}

      <div className="b-example-divider"></div>
      

      <div className="duo-images">
        <div className="image1-box">
          <img className="image" src={aboutImg0} alt="About us 1" />
        </div>
        <div className="image2-box">
          <img className="image" src={aboutImg6} alt="About us 2" />
        </div>
      </div>

      <div className="b-example-divider"></div>
      <div className="">
        <hr className="featurette-divider" />
        <div className="aboutustext">
          <h1>Vero Ceilings: Elevating Spaces with a Decade of Excellence.</h1>
          <p>Vero Ceilings is one of the divisions of the Vero Group Companies, which produces ceilings, MDF decor, ARMSTRONG suspended ceilings and also sells its products in 14 regions of Uzbekistan.
            <br />
            <br />
            Vero Ceilings doesn't just make ceilings; she creates architectural masterpieces. The product range includes innovative acoustic and aesthetic ceiling designs, as well as advanced solutions for commercial and residential applications. With a commitment to excellence, Vero Ceilings provides not only visually impressive options, but also functional solutions, ensuring that their ceilings meet the diverse needs of modern construction.
            <br />
            <br />
            Vero Ceilings provides a list of services provided: design, measurements, installation, delivery. The main goal of Vero Ceilings is to provide consumers with high-quality, safe branded products made from the best raw materials.
          </p>
        </div>
        {/* <hr className="featurette-divider" /> */}
        
      </div>
    </main>
  );
};

export default AboutUs;