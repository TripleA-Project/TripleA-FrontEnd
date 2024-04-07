import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 통계',
  description: 'Triple A 통계',
};

function AdminDashBoard() {
  return <div>dashboard</div>;
}

export default AdminDashBoard;
