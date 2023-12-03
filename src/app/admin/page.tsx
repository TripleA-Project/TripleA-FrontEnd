import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 관리자',
  description: 'Triple A 관리자 페이지',
};

function AdminHome() {
  return <div>admin home</div>;
}

export default AdminHome;
