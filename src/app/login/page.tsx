import LoginForm from '@/components/Form/LoginForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface LoginPageProps {
  searchParams: {
    continueURL?: string;
  };
}

export const metadata: Metadata = {
  title: 'Triple A | 로그인',
  description: 'Triple A 로그인',
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  return <LoginForm continueURL={searchParams?.continueURL} />;
}
