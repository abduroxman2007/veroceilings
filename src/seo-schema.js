export const SITE_URL = 'https://veroceilings.uz';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Turn a relative CRA asset path into the absolute URL schema.org requires. */
export const absoluteUrl = (path) => {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

/**
 * BreadcrumbList. `trail` is [{ name, path }] ordered from the home page down;
 * the final entry should be the current page and may omit `path`.
 */
export const breadcrumbSchema = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    ...(crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
  })),
});

/**
 * FAQPage. Google only grants the rich result when every question has a
 * non-empty answer, so blank entries are dropped rather than emitted.
 */
export const faqSchema = (items) => {
  const valid = items.filter((item) => item.question && item.answer);
  if (!valid.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
};

/**
 * Product.
 *
 * Deliberately omits `offers`: Vero does not publish prices yet, and inventing
 * one would be both wrong and a Merchant-listing policy violation. Add an
 * `offers` block with real UZS pricing when the price page ships — that is what
 * unlocks the price-bearing rich result the audit calls out as an open field.
 */
export const productSchema = ({ name, description, images, url, sku }) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  ...(description ? { description } : {}),
  ...(sku ? { sku } : {}),
  ...(images && images.length
    ? { image: images.map(absoluteUrl).filter(Boolean) }
    : {}),
  ...(url ? { url: absoluteUrl(url) } : {}),
  brand: { '@type': 'Brand', name: 'Vero Ceilings' },
  manufacturer: { '@id': ORGANIZATION_ID },
});
