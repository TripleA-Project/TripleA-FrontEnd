import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '비밀번호 변경',
  description: 'Triple A 비밀번호 변경',
};

async function PasswordEditPage() {
  return (
    <>
      <div>비밀번호 변경</div>
    </>
  );
}

export default PasswordEditPage;
