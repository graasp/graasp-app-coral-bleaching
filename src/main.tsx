import React from 'react';
import ReactDOM from 'react-dom/client';

import * as Sentry from '@sentry/react';

import { generateSentryConfig } from './config/sentry';
import './index.css';
import Root from './modules/Root';

Sentry.init({
  // integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  ...generateSentryConfig(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
