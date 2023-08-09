'use client';

import { useLayoutEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { HttpStatusCode } from 'axios';
import Button from '@/components/Button/Button';
import { membershipWithDrawal } from '@/service/user';
import { toastNotify } from '@/util/toastNotify';
import { deleteCookie } from '@/util/cookies';
import { type UseStepFormContext } from '../StepForm';
import { type ProfilePayload } from '@/interfaces/Dto/User';
import { useQueryClient } from '@tanstack/react-query';
import { unSubscribe } from '@/service/subscribe';

interface WithDrawalFormProps {
  user: ProfilePayload;
}

interface WithDrawalReason {
  reason: string;
  otherDetailReason?: string;
}

function WithDrawalForm({ user }: WithDrawalFormProps) {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const {
    register,
    getValues,
    formState: { isValid, isSubmitting },
    done,
    handleSubmit,
  } = useFormContext() as UseStepFormContext<WithDrawalReason>;

  const onValid = async (reason: WithDrawalReason) => {
    try {
      if (user.membership === 'PREMIUM') {
        await unSubscribe();
      }

      const { data: payload } = await membershipWithDrawal();

      if (payload.status === HttpStatusCode.Ok) {
        await deleteCookie('accessToken');

        queryClient.removeQueries({ queryKey: ['auth'] });
        queryClient.removeQueries({ queryKey: ['profile'] });

        done();

        push('/');

        return;
      }

      toastNotify('error', '회원 탈퇴 실패');
    } catch (err) {
      toastNotify('error', '회원 탈퇴 실패');
    }
  };

  const handleFocus = () => {
    if (!isMobile) return;

    document.body.style.height = window.screen.height - 54 - 24 + 'px';
  };

  const handleBlur = () => {
    if (!isMobile) return;

    document.body.style.height = window.innerHeight + 'px';
  };

  useLayoutEffect(() => {
    if (!isMobile) return;

    document.body.style.transform = 'translateY(0)';
    document.body.style.height = window.innerHeight + 'px';

    return () => {
      document.body.style.removeProperty('transform');
      document.body.style.removeProperty('height');
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} onBlur={handleBlur} className="mt-10">
        <div className="mb-[34px] space-y-5 text-sm">
          <p>{user.fullName} 님이 떠나신다니 아쉽습니다 :&#40;</p>
          <p>
            다음에 더 나은 모습으로 찾아뵐 수 있도록 아래
            <br />
            탈퇴 이유를 선택해주세요.
          </p>
        </div>
        <div className="box-border flex min-h-[300px] flex-col rounded-[10px] bg-[#F5F5F5] px-[26px] py-[33px]">
          <p className="mb-7 text-xs font-semibold">탈퇴 이유를 선택해주세요.</p>
          <div className="space-y-5">
            <div className="flex items-center">
              <input
                id="reason_other_app"
                type="radio"
                value="다른 앱 사용을 위해"
                className={`peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-2 border-[#C2C2C2] bg-transparent checked:bg-blackCircle`}
                {...register('reason', {
                  required: '이유를 선택해주세요',
                  validate: {
                    otherDetailRequired: (reason) => {
                      if (reason !== '기타') return true;

                      if (!getValues('otherDetailReason')?.length) return '기타 탈퇴 이유를 작성해주세요.';

                      return true;
                    },
                  },
                })}
              />
              <label
                htmlFor="reason_other_app"
                className="cursor-pointer pl-[14px] font-medium text-[#929292] transition-colors peer-checked:text-black"
              >
                다른 앱 사용을 위해
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="reason_uncomfortable"
                type="radio"
                value="사용하기 불편해서"
                className={`peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-2 border-[#C2C2C2] bg-transparent checked:bg-blackCircle`}
                {...register('reason')}
              />
              <label
                htmlFor="reason_uncomfortable"
                className="cursor-pointer pl-[14px] font-medium text-[#929292] transition-colors peer-checked:text-black"
              >
                사용하기 불편해서
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="reason_design"
                type="radio"
                value="디자인이 마음에 들지 않아서"
                className={`peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-2 border-[#C2C2C2] bg-transparent checked:bg-blackCircle`}
                {...register('reason')}
              />
              <label
                htmlFor="reason_design"
                className="cursor-pointer pl-[14px] font-medium text-[#929292] transition-colors peer-checked:text-black"
              >
                디자인이 마음에 들지 않아서
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="reason_error"
                type="radio"
                value="오류가 많아서"
                className={`peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-2 border-[#C2C2C2] bg-transparent checked:bg-blackCircle`}
                {...register('reason')}
              />
              <label
                htmlFor="reason_error"
                className="cursor-pointer pl-[14px] font-medium text-[#929292] transition-colors peer-checked:text-black"
              >
                오류가 많아서
              </label>
            </div>
            <div className="flex">
              <input
                id="reason_other"
                type="radio"
                value="기타"
                className={`peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-2 border-[#C2C2C2] bg-transparent checked:bg-blackCircle`}
                {...register('reason')}
              />
              <div className="-mt-0.5 flex w-full flex-col gap-2.5 peer-checked:[&>label]:text-black peer-checked:[&>textarea]:visible peer-checked:[&>textarea]:h-[130px] peer-checked:[&>textarea]:w-full">
                <label
                  htmlFor="reason_other"
                  className="cursor-pointer pl-[14px] font-medium text-[#929292] transition-colors"
                >
                  기타
                </label>
                <textarea
                  onFocus={handleFocus}
                  placeholder="기타 탈퇴 이유를 작성해주세요."
                  className="invisible box-border resize-none px-4 py-3 placeholder:text-sm placeholder:font-medium placeholder:text-[#D2D2D2]"
                  {...register('otherDetailReason')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed_inner fixed bottom-4">
          <Button
            type="submit"
            bgColorTheme="orange"
            textColorTheme="white"
            fullWidth
            disabled={!isValid || isSubmitting}
            className="!bg-black disabled:!bg-[#DBDEE1]"
          >
            계정 영구 삭제
          </Button>
        </div>
      </form>
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

export default WithDrawalForm;
