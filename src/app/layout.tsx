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
      <body>
        <main className={notoSans.className + ' m-auto box-border min-h-[844px] min-w-[390px] max-w-[768px] px-[30px]'}>
          <ReduxProvider>
            <ReactQueryProvider>
              <div className="mx-auto box-border min-w-[390px] overflow-auto pb-14 pt-[53px] sm:w-full md:max-w-[768px]">
                {children}
              </div>
              <Nav />
            </ReactQueryProvider>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
