import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import uzFlag from '../assets/images/uzbekistan.png'; // Assuming you will provide this file
import ruFlag from '../assets/images/russia.png';
import enFlag from '../assets/images/united-kingdom.png';

const languages = [
  { code: 'uz', label: 'UZ', flag: uzFlag },
  { code: 'ru', label: 'RU', flag: ruFlag },
  { code: 'en', label: 'EN', flag: enFlag },
];

const LanguageSwitcher = ({ dropdown, label, borderColorVar }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  const location = useLocation();
  const current = locale || i18n.language;

  // Switching language means navigating to the equivalent page under the
  // new locale prefix (e.g. /ru/products/grilyato -> /uz/products/grilyato),
  // not just flipping i18next's in-memory language while staying on the same
  // URL. The old behaviour was the whole reason every language shared one
  // URL — see SEO-AUDIT.md section 1.1.
  const switchTo = (code) => {
    const segments = location.pathname.split('/');
    // segments[0] is '' (leading slash), segments[1] is the current locale.
    const rest = segments.slice(2).join('/');
    const target = `/${code}${rest ? `/${rest}` : ''}${location.search}`;
    navigate(target);
  };
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const borderColor = borderColorVar ? `var(${borderColorVar})` : 'var(--color-border)';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!dropdown) {
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => switchTo(lang.code)}
            style={{
              background: 'none',
              border: 'none',
              color: current === lang.code ? 'var(--color-primary)' : 'var(--color-text)',
              fontWeight: current === lang.code ? 'bold' : 'normal',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: '4px',
              outline: 'none',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            aria-label={lang.label}
          >
            <img src={lang.flag} alt={lang.label} style={{ width: '20px', height: '20px' }} />
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  const currentLang = languages.find(l => l.code === current) || languages[0];

  return (
    <div ref={ref} className="lang-dropdown" style={{ position: 'relative', minWidth: '80px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: `1.5px solid ${borderColor}`,
          color: 'var(--color-text)',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
          padding: '4px 12px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          minWidth: '100px',
        }}
        aria-label={label || 'Language'}
      >
        <img src={currentLang.flag} alt={currentLang.label} style={{ width: '20px', height: '20px' }} />
        {currentLang.label}
        <span style={{ fontSize: '0.8em', marginLeft: '4px' }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            boxShadow: '0 2px 8px var(--color-shadow)',
            zIndex: 100,
            minWidth: '100%',
          }}
        >
          {languages.filter(l => l.code !== current).map(lang => (
            <button
              key={lang.code}
              onClick={() => { switchTo(lang.code); setOpen(false); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text)',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '8px 12px',
                width: '100%',
                textAlign: 'left',
                borderRadius: '6px',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <img src={lang.flag} alt={lang.label} style={{ width: '20px', height: '20px' }} />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
