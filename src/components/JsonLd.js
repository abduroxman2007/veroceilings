import { useEffect } from 'react';

/**
 * Injects a JSON-LD block into <head> for the lifetime of the mounting component.
 *
 * Site-wide Organization/WebSite schema is hardcoded in public/index.html so it
 * survives crawlers that do not run JavaScript. This component covers the
 * per-route schema that can only be known at render time.
 */
const JsonLd = ({ id, schema }) => {
  // Serialise up front so the effect depends on the schema's *value*, not the
  // object identity — otherwise it would tear down and re-inject every render.
  const json = schema ? JSON.stringify(schema) : null;

  useEffect(() => {
    if (!json) return undefined;

    // Guard against a stale node left behind by a previous route.
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = json;
    document.head.appendChild(script);

    return () => script.remove();
  }, [id, json]);

  return null;
};

export default JsonLd;
