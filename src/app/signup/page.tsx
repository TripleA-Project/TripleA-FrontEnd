import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Triple A | 회원가입',
  description: 'Triple A 회원가입',
};

export default function Signup() {
  return (
    <StepForm>
      <EmailForm />
      <EmailVerifyForm />
      <PasswordForm />
      <NameForm />
      <TermsForm />
      <SymbolForm skipable hasNotNavBar buttonText="다음" />
      <CategoryForm skipable hasNotNavBar buttonText="다음" />
      <CompleteSignup hideHeader />
    </StepForm>
  );
}
