import { useTranslation } from 'react-i18next';
import HeaderCarousel from '../components/HeaderCarousel';
import WhyUsSection from '../components/WhyUsSection';
import Products from '../components/Products';
import AccessoriesSection from '../components/AccessoriesSection';
import AboutUsSection from '../components/AboutUsSection';
import CeilingCalculator from '../components/CeilingCalculator';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';

function Home() {
  const { t } = useTranslation();
  return (
    <>
      {/*
        Visually hidden H1 — provides Google with a clear entity-definition signal
        (manufacturer + location + brand) without disrupting the visual carousel layout.
        The text comes from seo.h1 in each locale file so every language variant has
        its own keyword-optimised heading.
      */}
      <h1
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {t('seo.h1')}
      </h1>
      <HeaderCarousel />
      <WhyUsSection />
      <Products />
      <AccessoriesSection />
      <CeilingCalculator />
      <AboutUsSection />
      <FAQ />
      <ContactForm />
    </>
  );
}
export default Home;