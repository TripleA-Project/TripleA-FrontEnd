import Nav from '@/components/Nav';
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
      <body className={notoSans.className + ' bg-[#F5F7F9] min-w-[390px] max-w-[768px] min-h-[844px] m-auto'}>
        <main>
          <ReduxProvider>
            <ReactQueryProvider>
              {children}
              <Nav/>
            </ReactQueryProvider>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
