import LoginForm from '@/components/Form/LoginForm';
import { getProfile } from '@/service/user';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
  const userPayload = await getProfile()
    .then((res) => res.data.data!)
    .catch((err) => null);

  if (userPayload) {
    if (userPayload.memberRole === 'USER') {
      redirect(searchParams.continueURL ? decodeURIComponent(searchParams.continueURL) : '/');
    }

    const verifiedToken = cookies().get('verifiedToken')?.value;

    const adminVerifiedResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/verify`, {
      cache: 'no-store',
      headers: {
        Authorization: verifiedToken ? `Bearer ${verifiedToken}` : '',
        Cookie: cookies().toString(),
      },
    });

    if (adminVerifiedResponse.ok) {
      redirect(searchParams.continueURL ? decodeURIComponent(searchParams.continueURL) : '/');
    }
  }

  return <LoginForm continueURL={searchParams?.continueURL} userPayload={userPayload} />;
}
