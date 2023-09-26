'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/Button/Button';
import Dialog, { type DialogProps } from '@/components/UI/Dialog';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { MembershipGradeSummaryTemplate } from '@/constants/membership';
import { UnSubscribeResponse } from '@/interfaces/Dto/Subscribe';
import type { UseMutateFunction, UseMutationResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

interface UnsubscribeDialogProps extends Omit<DialogProps, 'children'> {
  mutateFunction: UseMutateFunction<AxiosResponse<UnSubscribeResponse, any>, unknown, void, unknown>;
  mutationStatus: UseMutationResult['status'];
}

function UnsubscribeDialog({ open, onClose, mutateFunction, mutationStatus }: UnsubscribeDialogProps) {
  const controlButtonGroupClassNames = twMerge([
    `flex w-full items-center justify-center gap-4`,
    mutationStatus === 'loading' && 'invisible',
  ]);

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="box-border rounded-xl bg-white p-4">
        <div className="text-center font-bold">
          <p>구독을 취소하실 경우</p>
          <p>일부 서비스 이용이 제한될 수 있습니다</p>
        </div>
        <div className="mx-auto my-4 w-max">
          <p className="mb-1 text-xs text-gray-500">구독(유료) 회원 혜택 요약</p>
          <div className="flex flex-col gap-2 bg-[#eee] p-4">
            {MembershipGradeSummaryTemplate.PREMIUM.map((benefit) => (
              <div key={benefit} className="text-sm font-bold">
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-bold text-[#FD954A]">
            {mutationStatus === 'loading' ? '구독 해지 요청 중' : '구독을 해지 하시겠습니까?'}
          </p>
        </div>
        <div className="mt-4">
          {mutationStatus === 'loading' ? (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <div className="translate-y-[3.4px]">
                <MuiSpinner size={26} />
              </div>
            </div>
          ) : null}
          <div className={controlButtonGroupClassNames}>
            <Button
              bgColorTheme="orange"
              textColorTheme="white"
              className="h-fit w-fit !px-2 !py-1"
              onClick={() => onClose()}
            >
              취소
            </Button>
            <Button
              bgColorTheme="none"
              textColorTheme="orange"
              className="h-fit w-fit !px-2 !py-1 !transition-colors !duration-300 hover:!text-orange-600"
              onClick={() => {
                mutateFunction();

                onClose();
              }}
            >
              구독 해지
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default UnsubscribeDialog;
