import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Projects from "./pages/Projects"
import Architects from "./pages/Architects"
import About from "./pages/About"
import Contact from "./pages/Contact"
import FAQ from "./pages/FAQ"
import LocaleLayout from "./components/LocaleLayout"
import NotFound from "./components/NotFound"
import { DEFAULT_LOCALE } from "./i18n/locales"

/**
 * Every route used to live at a bare path (/products, /products/:id, ...)
 * with the language chosen at runtime from localStorage. That meant one URL
 * per page shared by all three languages, and a crawler could only ever see
 * one of them — see SEO-AUDIT.md section 1.1. Routes now live under
 * /:locale/*, and each of these bare paths redirects to its /uz equivalent
 * so any links or bookmarks pointing at the old URLs keep working. The real,
 * crawler-facing fix is the server-side 301 in nginx.conf/apache.conf; this
 * client-side redirect is the fallback for anyone who reaches these paths
 * with JS already loaded.
 */
const LegacyRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/${DEFAULT_LOCALE}${location.pathname}${location.search}`} replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />

        {/* Legacy bare paths, pre-dating locale-prefixed routing. These are
            structurally distinct from /:locale/* (see App.js history / PR
            description) so there is no ranking ambiguity between the two. */}
        <Route path="/products" element={<LegacyRedirect />} />
        <Route path="/products/*" element={<LegacyRedirect />} />
        <Route path="/projects" element={<LegacyRedirect />} />
        <Route path="/architects" element={<LegacyRedirect />} />
        <Route path="/about" element={<LegacyRedirect />} />
        <Route path="/contact" element={<LegacyRedirect />} />
        <Route path="/faq" element={<LegacyRedirect />} />

        {/* One shared layout instance (Navbar/Footer/RouteMeta) for every
            locale-prefixed page, so navigating between pages swaps only the
            <Outlet/> content instead of remounting the whole chrome. */}
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="projects" element={<Projects />} />
          <Route path="architects" element={<Architects />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
