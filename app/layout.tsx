import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Fira_Mono } from 'next/font/google';

import '../styles/globals.css';
import '../styles/custom-styles.css';

// disable automatic CSS insertion
config.autoAddCss = false;

const firaMono = Fira_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-fira-mono',
});

export const metadata = {
  title: 'Satrajit Chatterjee',
  description: 'Satrajit Chatterjee',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={firaMono.variable}>
      <body>{children}</body>
    </html>
  );
}
