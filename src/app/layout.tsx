import Navbar from '@/components/Nav';
import './globals.css';
import ReactQueryProvider from '@/reactQuery/Provider';
import ReduxProvider from '@/redux/ReduxProvider';
import { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    default: '',
    template: 'TripleA | %s',
  },
  description: 'Triple A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <main>
          <ReduxProvider>
            <ReactQueryProvider>
              {children}
              <Navbar/>
            </ReactQueryProvider>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
