import HeaderCarousel from '../components/HeaderCarousel';
import WhyUsSection from '../components/WhyUsSection';
import Products from '../components/Products';
import AccessoriesSection from '../components/AccessoriesSection';

function Home() {
  return (
    <>
      <HeaderCarousel />
      <WhyUsSection />
      <Products />
      <AccessoriesSection />
      {/* Add other home page content here */}
    </>
  );
}
export default Home;