import HeaderCarousel from '../components/HeaderCarousel';
import WhyUsSection from '../components/WhyUsSection';
import Products from '../components/Products';
import AccessoriesSection from '../components/AccessoriesSection';
import AboutUsSection from '../components/AboutUsSection';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
function Home() {
  return (
    <>
      <HeaderCarousel />
      <WhyUsSection />
      <Products />
      <AccessoriesSection />
      <AboutUsSection />
      <FAQ />
      <ContactForm />
      {/* Add other home page content here */}
    </>
  );
}
export default Home;