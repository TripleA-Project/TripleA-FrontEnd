import SignupForm from '@/components/Form/SignupForm';
import { Metadata } from 'next';
import StepForm from '@/components/Form/StepForm';
import { EmailForm } from '@/components/Form/EmailForm';
import SignupCompleteForm from '@/components/Form/SignupCompleteForm';
import PasswordForm from '@/components/Form/PasswordForm';
import TermsForm from '@/components/Form/TermsForm';
import Header from '@/components/Header';
import FullNameForm from '@/components/Form/funnNameForm';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'Triple A 회원가입',
};

export default function Signup() {
  return (
    <StepForm>
      <SignupForm />
      <EmailForm />
      <PasswordForm />
      <FullNameForm />
      <TermsForm />
      <SignupCompleteForm />
    </StepForm>
  );
}
