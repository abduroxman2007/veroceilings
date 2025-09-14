import { useEffect } from "react";
import "./App.css"
import { useTranslation } from "react-i18next"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Projects from "./pages/Projects"
import Architects from "./pages/Architects"
import About from "./pages/About"
import Contact from "./pages/Contact"
import FAQ from "./pages/FAQ"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t("seo.title")
    const descriptionMeta = document.querySelector('#meta-description');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t('seo.description'));
    }
    const keywordsMeta = document.querySelector('#meta-keywords');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', t('seo.keywords'));
    }
  }, [i18n.language, t]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/architects" element={<Architects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
