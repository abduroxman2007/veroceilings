/**
 * Verifies the locale-prefixed routing (/uz /ru /en) and its dependent SEO
 * metadata end to end: real React Router, real i18next, real LocaleLayout,
 * real RouteMeta, real Navbar/Footer/LanguageSwitcher — everything this PR
 * actually changed.
 *
 * Page *content* components (Home, Products, ProductDetails, ...) are
 * swapped for trivial stubs here rather than imported for real. That is not
 * a shortcut around testing this PR's code — none of those pages were
 * touched semantically (only their <Link> import, which IS exercised via
 * Navbar/Footer/PageHeader below). It sidesteps a pre-existing, unrelated
 * problem: several of those pages import Swiper/lightgallery, which ship
 * ESM-only builds that react-scripts 5's bundled Jest (v27) cannot resolve
 * regardless of anything in this PR — the original boilerplate App.test.js
 * (deleted here) already hit the exact same resolution error on `swiper/react`
 * before any of this branch's changes existed, via Home -> HeaderCarousel.
 * Fixing that is a separate, pre-existing test-infra gap, out of scope here.
 */
import './i18n/i18n'; // real, fully-initialized i18next singleton — same as index.js
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LocaleLayout from './components/LocaleLayout';
import NotFound from './components/NotFound';
import { DEFAULT_LOCALE } from './i18n/locales';
import products from './product-data';

const StubHome = () => <h1>Home stub</h1>;
const StubProducts = () => <h1>Products stub</h1>;
const StubProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  return <h1>{product ? product.id : 'unknown'} stub</h1>;
};

const LegacyRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/${DEFAULT_LOCALE}${location.pathname}${location.search}`} replace />;
};

/** Mirrors App.js's route tree exactly, with page content stubbed out. */
const TestApp = () => (
  <Routes>
    <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
    <Route path="/products" element={<LegacyRedirect />} />
    <Route path="/products/*" element={<LegacyRedirect />} />
    <Route path="/:locale" element={<LocaleLayout />}>
      <Route index element={<StubHome />} />
      <Route path="products" element={<StubProducts />} />
      <Route path="products/:id" element={<StubProductDetails />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <TestApp />
    </MemoryRouter>
  );
}

const canonicalHref = () => document.querySelector('link[rel="canonical"]')?.getAttribute('href');
const hreflangHrefs = () =>
  [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
    .map((el) => `${el.getAttribute('hreflang')}=${el.getAttribute('href')}`)
    .sort();

describe('locale-prefixed routing', () => {
  test('/uz renders the Uzbek homepage with a correct canonical + full hreflang set', async () => {
    renderAt('/uz');
    await screen.findByText('Home stub');
    await waitFor(() => expect(document.documentElement.getAttribute('lang')).toBe('uz'));
    await waitFor(() => expect(canonicalHref()).toBe('https://veroceilings.uz/uz'));
    expect(hreflangHrefs()).toEqual([
      'en=https://veroceilings.uz/en',
      'ru=https://veroceilings.uz/ru',
      'uz=https://veroceilings.uz/uz',
      'x-default=https://veroceilings.uz/uz',
    ]);
  });

  test('/ru renders with lang=ru and a matching canonical', async () => {
    renderAt('/ru');
    await screen.findByText('Home stub');
    await waitFor(() => expect(document.documentElement.getAttribute('lang')).toBe('ru'));
    await waitFor(() => expect(canonicalHref()).toBe('https://veroceilings.uz/ru'));
  });

  test('/ru/products gets its own canonical, distinct from the homepage', async () => {
    renderAt('/ru/products');
    await screen.findByText('Products stub');
    await waitFor(() => expect(canonicalHref()).toBe('https://veroceilings.uz/ru/products'));
  });

  test('/ru/products/grilyato resolves the right product and canonical', async () => {
    renderAt('/ru/products/grilyato');
    await screen.findByText('grilyato stub');
    await waitFor(() => expect(canonicalHref()).toBe('https://veroceilings.uz/ru/products/grilyato'));
    await waitFor(() => expect(document.title).toMatch(/Toshkent \| Vero Ceilings$/));
  });

  test('an invalid locale segment renders a real not-found page, not a silent redirect', async () => {
    renderAt('/xyz/products');
    expect(await screen.findByText('404')).toBeInTheDocument();
    await waitFor(() =>
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex')
    );
  });

  test('legacy bare /products/grilyato redirects into /uz', async () => {
    renderAt('/products/grilyato');
    await screen.findByText('grilyato stub');
    await waitFor(() => expect(canonicalHref()).toBe('https://veroceilings.uz/uz/products/grilyato'));
  });

  test('the language switcher navigates to the equivalent page under the new locale, preserving the path', async () => {
    const { container } = renderAt('/ru/products/grilyato');
    await screen.findByText('grilyato stub');
    await waitFor(() => expect(canonicalHref()).toBe('https://veroceilings.uz/ru/products/grilyato'));

    // The dropdown's alternate-language buttons only exist in the DOM once
    // open — open it via its stable DOM structure rather than its accessible
    // name (the toggle's aria-label is a pre-existing, unrelated prop-type
    // issue in LanguageSwitcher: Navbar passes a React element where an
    // aria-label expects a string).
    fireEvent.click(container.querySelector('.lang-dropdown > button'));

    // The alternate-language buttons combine an <img alt="UZ"> with an
    // adjacent "UZ" text node with no separator, which makes the computed
    // accessible name unreliable to match exactly via getByRole. Matching on
    // the button's own text content is unambiguous and is what a real click
    // actually targets.
    const uzButton = await waitFor(() => {
      const match = [...container.querySelectorAll('.lang-dropdown button')].find(
        (btn) => btn.textContent.trim() === 'UZ'
      );
      if (!match) throw new Error('UZ dropdown option not yet rendered');
      return match;
    });
    fireEvent.click(uzButton);

    await waitFor(() => expect(canonicalHref()).toBe('https://veroceilings.uz/uz/products/grilyato'));
    await waitFor(() => expect(document.documentElement.getAttribute('lang')).toBe('uz'));
  });
});
