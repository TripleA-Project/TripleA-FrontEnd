import './globals.css';
import ReactQueryProvider from '@/reactQuery/Provider';
import ReduxProvider from '@/redux/ReduxProvider';
import { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import Page from '@/components/Layout/Page';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import SetupClientMSW from '@/components/MSW/SetupClientMSW';
import SetupServerMSW from '@/components/MSW/SetupServerMSW';
import DomainHeader from './_layouts/header/DomainHeader';
import NavigationEvents from './_layouts/NavigationEvents';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className="min-h-screen">
      <body
        className={`${notoSans.className} min-h-screen overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg`}
      >
        <SetupServerMSW />
        <SetupClientMSW />
        <ReduxProvider>
          <ReactQueryProvider>
            <NavigationEvents />
            <DomainHeader />
            <Page>{children}</Page>
            <Navbar />
            <Footer />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
