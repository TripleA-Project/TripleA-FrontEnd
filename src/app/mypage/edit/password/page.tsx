import { Metadata } from 'next';
import EditPasswordPage from '@/components/Mypage/EditPasswordPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 비밀번호 변경',
  description: 'Triple A 비밀번호 변경',
};

async function PasswordEditPage() {
  return (
    <div className="mt-[73px] box-border px-4">
      <EditPasswordPage />
    </div>
  );
}

export default PasswordEditPage;
