import './globals.css';
import ReactQueryProvider from '@/reactQuery/Provider';
import ReduxProvider from '@/redux/ReduxProvider';
import { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import Page from '@/components/Layout/Page';
import Navbar from '@/components/Layout/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
  description: 'Triple A',
  openGraph: {
    images: {
      url: '/bgLogo.png',
    },
  },
  twitter: {
    images: {
      url: '/bgLogo.png',
    },
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className="min-h-screen">
      <body
        className={`${notoSans.className} min-h-screen overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg`}
      >
        <ReduxProvider>
          <ReactQueryProvider>
            <Page>{children}</Page>
            <Navbar />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
