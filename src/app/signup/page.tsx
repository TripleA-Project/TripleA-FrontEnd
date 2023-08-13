import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import StepForm from '@/components/Form/StepForm';
import EmailForm from '@/components/Form/EmailForm';
import EmailVerifyForm from '@/components/Form/EmailVerifyForm';
import PasswordForm from '@/components/Form/PasswordForm';
import NameForm from '@/components/Form/NameForm';
import TermsForm from '@/components/Form/TermsForm';
import SymbolForm from '@/components/Form/SymbolForm';
import CategoryForm from '@/components/Form/CategoryForm';
import CompleteSignup from '@/components/Form/CompleteSignup';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 회원가입',
  description: 'Triple A 회원가입',
};

export default function Signup() {
  return (
    <>
      <StepForm>
        <EmailForm />
        <EmailVerifyForm />
        <PasswordForm />
        <NameForm />
        <TermsForm />
        <SymbolForm skipable buttonText="다음" />
        <CategoryForm skipable buttonText="다음" />
        <CompleteSignup hideHeader />
      </StepForm>
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
