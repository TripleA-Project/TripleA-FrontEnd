'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { UseStepFormContext } from '../StepForm';
import FormTitle from '../FormTitle';
import Button from '@/components/Button/Button';
import ServiceTermModal from './ServiceTermModal';
import PrivacyTermModal from './PrivacyTermModal';
import { login, signup } from '@/service/auth';
import { deleteCookie, getCookie, setCookie } from '@/util/cookies';
import { toastNotify } from '@/util/toastNotify';
import type { FormData } from '@/interfaces/FormData';

export interface TermsFormData {
  newsLetter: boolean;
}

function TermsForm() {
  const {
    register,
    handleSubmit,
    done,
    setValue,
    formState: { errors },
  } = useFormContext() as UseStepFormContext<FormData>;

  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const serviceTermCheckRef = useRef<HTMLInputElement>(null);
  const privacyTermCheckRef = useRef<HTMLInputElement>(null);

  const [modal, setModal] = useState<{ modalType?: 'service' | 'privacy'; visible: boolean }>({ visible: false });
  const [isRequiredChecked, setIsRequiredChecked] = useState<boolean>(() => validateTermsForm());

  function validateTermsForm() {
    if (!serviceTermCheckRef?.current || !privacyTermCheckRef?.current) return false;

    const serviceTermChecked = serviceTermCheckRef.current.checked;
    const privacyTermChecked = privacyTermCheckRef.current.checked;

    const requiredAllChecked = serviceTermChecked && privacyTermChecked;

    setIsRequiredChecked(requiredAllChecked);

    return requiredAllChecked;
  }

  const title = `
    이용약관에 동의해주세요.
  `;

  const handleAllCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!serviceTermCheckRef?.current || !privacyTermCheckRef?.current) return;

    const targetCheckedValue = e.target.checked;

    serviceTermCheckRef.current.checked = targetCheckedValue;
    privacyTermCheckRef.current.checked = targetCheckedValue;
    setValue('newsLetter', targetCheckedValue);

    validateTermsForm();
  };

  const onValid = async ({ email, emailKey, password, passwordCheck, fullName, newsLetter }: FormData) => {
    // 회원가입 => 저장된 정보로 로그인 => 액세스토큰 설정 => 심볼 , 카테고리 설정 페이지 이동

    try {
      // 회원가입
      await signup({
        email: email!,
        password: password!,
        passwordCheck: passwordCheck!,
        fullName: fullName!,
        newsLetter: newsLetter!,
        emailKey: emailKey!,
      });

      // login
      try {
        const hasAccessToken = await getCookie('accessToken');

        if (hasAccessToken) {
          await deleteCookie('accessToken');
        }

        const loginResult = await login({ email: email!, password: password! });

        const accessToken = loginResult.headers['authorization'];

        if (accessToken) {
          await setCookie('accessToken', (accessToken as string).replace('Bearer ', ''), {
            maxAge: 60 * 60,
            path: '/',
          });
        }

        queryClient.invalidateQueries(['profile']);

        setTimeout(() => {
          done();
        }, 0);
      } catch (error) {
        replace('/');

        return;
      }
    } catch (err) {
      toastNotify('error', '회원가입에 실패했습니다');
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <FormTitle title={title} className="!mb-[54px]" />
      <div className="mb-5 flex h-fit items-center">
        <input className="peer hidden" type="checkbox" id="all-check" onChange={handleAllCheckChange} />
        <label
          className="cursor-pointer bg-[length:18px_18px] bg-[0_center] bg-no-repeat pl-[18px] text-[15px] font-bold text-black peer-checked:bg-circleChecked peer-[&:not(:checked)]:bg-circleNotChecked"
          htmlFor="all-check"
        >
          <span className="ml-2.5 block">전체 동의하기</span>
        </label>
      </div>
      <hr className="mb-[18px] border-b-[1px] border-b-[#E0E4E8]" />
      <div className="space-y-5">
        <div className="flex h-fit items-center">
          <input
            ref={serviceTermCheckRef}
            className="peer hidden"
            type="checkbox"
            id="service-check"
            onChange={validateTermsForm}
          />
          <label
            className="cursor-pointer bg-[length:18px_18px] bg-[0_center] bg-no-repeat pl-[18px] text-[15px] text-black peer-checked:bg-circleChecked peer-[&:not(:checked)]:bg-circleNotChecked"
            htmlFor="service-check"
          >
            <span className="ml-2.5 block">[필수] 이용약관 동의</span>
          </label>
          <MdOutlineArrowBackIosNew
            role="button"
            className="ml-1 shrink-0 rotate-180 text-sm"
            onClick={() => setModal((prev) => ({ ...prev, modalType: 'service', visible: true }))}
          />
        </div>
        <div className="flex h-fit items-center">
          <input
            ref={privacyTermCheckRef}
            className="peer hidden"
            type="checkbox"
            id="privacy-check"
            onChange={validateTermsForm}
          />
          <label
            className="cursor-pointer bg-[length:18px_18px] bg-[0_center] bg-no-repeat pl-[18px] text-[15px] text-black peer-checked:bg-circleChecked peer-[&:not(:checked)]:bg-circleNotChecked"
            htmlFor="privacy-check"
          >
            <span className="ml-2.5 block">[필수] 개인정보 처리방침 동의</span>
          </label>
          <MdOutlineArrowBackIosNew
            role="button"
            className="ml-1 shrink-0 rotate-180 text-sm"
            onClick={() => setModal((prev) => ({ ...prev, modalType: 'privacy', visible: true }))}
          />
        </div>
        <div className="flex h-fit items-center">
          <input
            className="peer hidden"
            type="checkbox"
            id="newsletter-check"
            {...register('newsLetter', {
              validate() {
                const result = validateTermsForm();

                if (result === true) return true;

                return '필수 약관을 모두 체크해주세요.';
              },
            })}
          />
          <label
            className="cursor-pointer bg-[length:18px_18px] bg-[0_center] bg-no-repeat pl-[18px] text-[15px] text-black peer-checked:bg-circleChecked peer-[&:not(:checked)]:bg-circleNotChecked"
            htmlFor="newsletter-check"
          >
            <span className="ml-2.5 block">[선택] 뉴스레터 이메일 수신 동의</span>
          </label>
        </div>
        {errors?.root ? <div className="text-sm text-error">{errors.root.message}</div> : null}
      </div>
      <Button
        type="submit"
        sizeTheme="fullWidth"
        className="mt-14 font-bold disabled:!cursor-default disabled:!bg-[#DBDEE1]"
        bgColorTheme="orange"
        textColorTheme="white"
        disabled={!isRequiredChecked}
      >
        다음
      </Button>
      {modal.visible && modal.modalType === 'service' ? (
        <ServiceTermModal onClose={() => setModal((prev) => ({ ...prev, visible: false }))} />
      ) : null}
      {modal.visible && modal.modalType === 'privacy' ? (
        <PrivacyTermModal onClose={() => setModal((prev) => ({ ...prev, visible: false }))} />
      ) : null}
    </form>
  );
}
export default TermsForm;
