import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/i18n';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

// Once the prerender step ships (scripts/prerender.js), #root arrives from
// the server already containing real markup for that exact route/locale.
// hydrateRoot attaches to it in place; createRoot would discard it and
// re-render from scratch, causing a visible flash and wasting the whole
// point of prerendering. The plain createRoot path stays for `npm start`,
// where #root is genuinely empty.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

reportWebVitals();
