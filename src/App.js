import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Projects from './pages/Projects';
import Architects from './pages/Architects';
import Clients from './pages/Clients';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import InstallationGuide from './pages/InstallationGuide';
import Manufacturing from './pages/Manufacturing';
import Footer from './components/Footer';

function App() {
  const { t } = useTranslation();
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/architects" element={<Architects />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/installation-guide" element={<InstallationGuide />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
