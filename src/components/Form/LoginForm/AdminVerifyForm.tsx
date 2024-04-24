'use client';

import Button from '@/components/Button/Button';
import { AppLogos } from '@/components/Icons';
import Timer, { timerInit, timerInitSeconds, timerReset, timerStart } from '@/components/Timer';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { ReactQueryHashKeys } from '@/constants/queryHashKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import { useAdminVerifyMutation } from '@/hooks/adminMutation/useAdminVerifyMutation';
import { sendAdminAuthEmail } from '@/service/admin';
import { jwtAuthTokenDecode, jwtVerifiedTokenDecode, jwtVerifiedTokenSign } from '@/util/actions/jwt';
import { revalidateAction } from '@/util/actions/revalidate';
import { getCookie, setCookie } from '@/util/cookies';
import { toastNotify } from '@/util/toastNotify';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

interface AdminVerifyFormData {
  code: string;
}

type VerifyEmailStatus = 'idle' | 'loading' | 'expired' | 'success' | 'error';

interface AdminVerifyFormProps {
  email: string;
  continueURL?: string;
}

function AdminVerifyForm({ email, continueURL }: AdminVerifyFormProps) {
  const queryClient = useQueryClient();

  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    setError,
    formState: { isValid, errors },
  } = useForm<AdminVerifyFormData>();

  const [sendEmailStatus, setSendEmailStatus] = useState<VerifyEmailStatus>('idle');

  const { adminEmailVerify, adminEmailVerifyStatus } = useAdminVerifyMutation({
    async onSuccess() {
      const accessToken = await getCookie('accessToken');

      if (!accessToken) {
        revalidateAction('/login', 'page');
        queryClient.invalidateQueries(ReactQueryHashKeys.getProfile);

        setTimeout(() => {
          replace(ROUTE_PATH.LOGIN(continueURL));
        }, 0);

        return;
      }

      const decodedAccessToken = await jwtAuthTokenDecode(accessToken);

      const expiresDate = dayjs(decodedAccessToken.exp! * 1000).toDate();
      const expiresIn = Number((dayjs(expiresDate).diff(dayjs()) / 1000).toFixed(0));

      // 관리자 토큰이고, 코드 인증을 성공함
      const verifiedToken = await jwtVerifiedTokenSign(
        { email, codeVerified: true },
        { subject: 'triple-a', expiresIn },
      );

      await setCookie('verifiedToken', verifiedToken, {
        path: '/',
        expires: expiresDate,
        httpOnly: true,
      });

      queryClient.invalidateQueries(ReactQueryHashKeys.getProfile);

      setTimeout(() => {
        replace(decodeURIComponent(continueURL ?? ROUTE_PATH.ADMIN.DASH_BOARD));
      }, 0);
    },
    onError(error) {
      setError('root', { type: 'validate', message: '유효한 코드가 아닙니다.' });
    },
  });

  const codeInputClassNames = {
    wrapper: twMerge([
      'relative flex h-[46px] w-full items-center rounded-lg border bg-white px-4 py-3 transition duration-300',
      getValues('code') ? 'border-black' : 'border-[#DBDEE1]',
      (errors.code || errors.root) && 'border-error',
    ]),
  };

  const sendVerifyEmail = async () => {
    if (sendEmailStatus === 'loading') return;

    if (errors?.code || errors?.root) {
      clearErrors();
    }

    setSendEmailStatus('loading');

    try {
      const accessToken = (await getCookie('accessToken')) as string;

      await sendAdminAuthEmail();

      const sendTimeStamp = Date.now();

      const decodedAccessToken = await jwtAuthTokenDecode(accessToken);

      const expiresDate = dayjs(decodedAccessToken.exp! * 1000).toDate();
      const expiresIn = Number((dayjs(expiresDate).diff(dayjs()) / 1000).toFixed(0));

      const verifiedToken = await jwtVerifiedTokenSign(
        { email, codeVerified: false, sendTimeStamp },
        { subject: 'triple-a', expiresIn },
      );

      await setCookie('verifiedToken', verifiedToken, {
        path: '/',
        expires: expiresDate,
        httpOnly: true,
      });

      setSendEmailStatus('success');

      timerInit(3);
      timerStart();

      setTimeout(() => {
        toastNotify('info', `${email}로 발송된 코드를 확인해주세요.`);
      }, 0);
    } catch (error) {
      timerInit(3);
      timerReset();

      setSendEmailStatus('error');
    }
  };

  const onSubmit = async (data: AdminVerifyFormData) => {
    if (adminEmailVerifyStatus === 'loading') return;

    adminEmailVerify({ email, code: data.code });
  };

  useEffect(() => {
    (async () => {
      const accessToken = await getCookie('accessToken');

      if (!accessToken) {
        revalidateAction('/login', 'page');
        queryClient.invalidateQueries(ReactQueryHashKeys.getProfile);

        setTimeout(() => {
          replace(ROUTE_PATH.LOGIN(continueURL));
        }, 0);

        return;
      }

      const currentVerifiedToken = await getCookie('verifiedToken');

      if (currentVerifiedToken) {
        const decodedVerifiedToken = await jwtVerifiedTokenDecode(currentVerifiedToken);

        const diff = dayjs(decodedVerifiedToken.sendTimeStamp).add(3, 'minutes').diff(dayjs());

        if (diff <= 0) {
          timerInit(0);
          timerReset();

          return;
        }

        const seconds = Number((diff / 1000).toFixed(0));

        setSendEmailStatus('success');

        timerInitSeconds(seconds);
        timerStart();

        return;
      }

      sendVerifyEmail();
    })();
  }, []); /* eslint-disable-line */

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="-mt-[52px] box-border px-4">
      <div className="mt-[30px]">
        <div className="mb-3">
          <h2 className="mb-12 flex items-center justify-center gap-3 font-[900]">
            <AppLogos.Orange />
            Triple A
          </h2>
          <div className="relative space-y-[18px]">
            <div className="font-bold">관리자 인증 코드를 입력해주세요</div>
            <input
              value={email}
              className="box-border w-full cursor-default items-center justify-center rounded-lg border border-[#DBDEE1] bg-white px-[18px] py-3 text-sm font-semibold text-[#DBDEE1] outline-none"
              readOnly
            />
            <div>
              <div className={codeInputClassNames.wrapper}>
                <input
                  {...register('code', { required: '인증 코드를 입력해주세요.' })}
                  className="flex-1 border-none text-sm font-semibold text-black placeholder-[#DBDEE1] outline-none placeholder:font-normal"
                  onClick={() => {
                    if (errors.root) {
                      clearErrors('root');
                    }
                  }}
                />
                <Timer
                  minute={3}
                  autoStart={false}
                  loading={sendEmailStatus === 'idle' || sendEmailStatus === 'loading'}
                  className="shrink-0 text-sm text-[#454C52]"
                  onTimeEnd={() => {
                    setSendEmailStatus('expired');
                  }}
                />
              </div>
              <div>
                {errors.code || errors.root ? (
                  <span className="text-xs text-error">{errors.code?.message ?? errors.root?.message}</span>
                ) : (
                  <span className="text-xs">&nbsp;</span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]"
              sizeTheme="fullWidth"
              bgColorTheme="orange"
              textColorTheme="white"
              disabled={!isValid || adminEmailVerifyStatus === 'loading' || adminEmailVerifyStatus === 'success'}
            >
              이메일 인증하기
            </Button>
            <SendEmailStatus status={sendEmailStatus} sendVerifyEmail={sendVerifyEmail} />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" newestOnTop={true} />
    </form>
  );
}

export default AdminVerifyForm;

const SendEmailStatus = ({
  status,
  sendVerifyEmail,
}: {
  status: VerifyEmailStatus;
  sendVerifyEmail: () => Promise<void>;
}) => {
  const RenderStatus = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <MuiSpinner size={16} />
            <span className="text-sm font-bold">인증 이메일을 발송 중 입니다.</span>
          </>
        );
      case 'expired':
        return (
          <>
            <span className="text-sm font-bold">인증 코드 유효시간이 만료되었습니다.</span>
            <Button
              bgColorTheme="orange"
              textColorTheme="white"
              className="h-fit w-fit px-2 py-1 text-sm"
              onClick={sendVerifyEmail}
            >
              재발송
            </Button>
          </>
        );
      case 'error':
        return (
          <>
            <span className="text-sm font-bold">인증 이메일 발송에 실패했습니다.</span>
            <Button
              bgColorTheme="orange"
              textColorTheme="white"
              className="h-fit w-fit px-2 py-1 text-sm"
              onClick={sendVerifyEmail}
            >
              재발송
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  if (status === 'idle' || status === 'success') return null;

  return (
    <div className="absolute left-0 top-[2px] -mx-0.5 h-full w-[calc(100%+4px)] bg-white/10 backdrop-blur-[1px]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-white p-2 shadow-sm">
          <RenderStatus />
        </div>
      </div>
    </div>
  );
};
