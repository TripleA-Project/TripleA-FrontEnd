import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import FindPasswordForm from '@/components/Form/FindPasswordForm';
import FindPasswordHeader from '@/components/Layout/Header/FindPasswordHeader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'TripleA | 비밀번호 찾기',
  description: 'Triple A 비밀번호 찾기',
};

function FindPassword() {
  return (
    <>
      <FindPasswordHeader />
      <FindPasswordForm />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default FindPassword;
