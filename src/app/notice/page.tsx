import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 공지사항',
  description: 'Triple A | 공지사항',
};

export default function NoticePage() {
  return (
    <div className="box-border px-4">
      <div>공지사항 리스트</div>
      <ToastContainer position="bottom-center" newestOnTop={true} />
    </div>
  );
}
