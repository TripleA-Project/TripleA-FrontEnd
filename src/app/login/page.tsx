import { Metadata } from 'next';
import LoginForm from '@/components/Form/LoginForm';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Triple A 로그인',
};
export default function LoginPage() {
  return <LoginForm />;
}
