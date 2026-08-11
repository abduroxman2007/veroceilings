import "./App.css"
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
import RouteMeta from "./components/RouteMeta"

function App() {
  return (
    <Router>
      {/* Title/description/canonical now vary per route — see RouteMeta.
          It must live inside <Router> to read the current location. */}
      <RouteMeta />
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
