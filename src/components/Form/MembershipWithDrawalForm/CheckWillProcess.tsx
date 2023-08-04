'use client';

import { useFormContext } from 'react-hook-form';
import Button from '@/components/Button/Button';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { type UseStepFormContext } from '../StepForm';

function CheckWillProcess() {
  const { done, handleSubmit } = useFormContext() as UseStepFormContext;

  const onValid = () => {
    done();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="mt-[55px] flex h-[244px] w-full items-center justify-center">
        <NotificationIcons.Error className="text-[48px]" />
      </div>
      <ul className="flex list-disc flex-col gap-4 text-sm">
        <p className="font-bold">탈퇴하시면,</p>
        <li className="ml-8 font-medium">
          유료회원이라면 무제한으로 뉴스 보기, 상세뉴스 보기, 심볼별 차트 보기 기능이 제한됩니다.
        </li>
        <li className="ml-8 font-medium">
          탈퇴 후에는 계정을 다시 살리거나, 북마크, 관심등록 등의 데이터를 복구할 수 없습니다.
        </li>
        <li className="ml-8 font-medium">본 계정으로는 다시는 로그인 할 수 없습니다.</li>
      </ul>
      <div className="fixed_inner fixed bottom-4">
        <p className="mb-[18px] text-center text-xs font-semibold text-[#FD954A]">정말 탈퇴하시겠습니까?</p>
        <Button type="submit" bgColorTheme="orange" textColorTheme="white" fullWidth>
          다음
        </Button>
      </div>
    </form>
  );
}

export default CheckWillProcess;
