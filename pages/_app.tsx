import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '../styles/globals.css';
import '../styles/custom-styles.css';

import type { AppProps } from 'next/app';

// disable automatic CSS insertion
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
