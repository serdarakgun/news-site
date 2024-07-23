import { Providers } from '../providers';
import { Inter } from 'next/font/google';
import '@/src/app/globals.css';
import { LayoutProvider } from './layout/context/layoutcontext';
import '@/styles/layout/layout.scss';
import ToastMessage from '@/src/components/toastMessage/toastMessage';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Habercim',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              const style = document.createElement('style')
              style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
              style.setAttribute('type', 'text/css')
              document.querySelector('head').prepend(style)
            `,
            }}
          />
        </head>
        <body className={inter.className}>
          <ToastMessage />
          <LayoutProvider>{children}</LayoutProvider>
        </body>
      </html>
    </Providers>
  );
}
