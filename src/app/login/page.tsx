import LoginForm from '@/components/Form/LoginForm';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '로그인',
  description: 'Triple A 로그인',
};

function Login() {
  return (
    <div>
      Login Page
      <LoginForm />
    </div>
  );
}

export default Login;
