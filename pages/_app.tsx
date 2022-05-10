import "../styles/globals.css";
import "../styles/custom-styles.css";
import "../styles/deprecated.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
