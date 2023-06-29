'use client';

import React, { useState } from 'react';
import Avatar from '../Avatar';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { ProfilePayload } from '@/interfaces/Dto/User';
import Link from 'next/link';
import { HiPencil } from 'react-icons/hi';
import Button from '../Button/Button';
import { FieldErrors, useForm } from 'react-hook-form';
import { validateFullName } from '@/util/validate';
import { updateUserInfo } from '@/service/user';

interface ProfileProps {
  mode?: 'info' | 'view' | 'edit';
  userProfile?: ProfilePayload;
}

interface EditProfileForm {
  fullName: string;
}

function Profile({ mode = 'info', userProfile }: ProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>();

  const [currentMode, setCurrentMode] = useState<Required<ProfileProps>['mode']>(mode);

  const [isFullNameEdit, setIsFullNameEdit] = useState(false);

  const user = {
    email: userProfile?.email ?? '',
    fullName: userProfile?.fullName ?? '',
    membership: userProfile?.membership,
  };

  const onValid = async (data: EditProfileForm) => {
    const res = await updateUserInfo({
      fullName: data.fullName,
      password: '123456abc!',
      passwordCheck: '123456abc!',
    });
    console.log('수정완료: ', { res });

    setIsFullNameEdit(false);
  };

  const onInvalid = (errors: FieldErrors<EditProfileForm>) => {
    //
  };

  const AvatarArea = () => {
    switch (currentMode) {
      case 'info':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[21px]">
              <Avatar fullName={user.fullName ?? ''} />
              <div className="">
                <p className="font-bold">{user.fullName ?? ' '}</p>
                <Link href="/me/edit/profile" className="text-sm font-bold text-[#666C77]">
                  기본 정보 보기
                </Link>
              </div>
            </div>
            <Link href="/me/edit/profile">
              <HiOutlineChevronRight className="shrink-0 text-2xl text-[#FD954A]" />
            </Link>
          </div>
        );
      case 'view':
        return (
          <div className="flex items-center">
            <div className="flex items-center gap-[21px]">
              <Avatar fullName={user.fullName ?? ''} />
              <span className="font-bold">{user.fullName ?? ''}</span>
            </div>
          </div>
        );
      case 'edit':
        return (
          <>
            <form id="editProfile" className="flex items-center" onSubmit={handleSubmit(onValid, onInvalid)}>
              <div className="flex items-center gap-[21px]">
                <Avatar fullName={user.fullName ?? ''} />
                <div className="relative flex items-center gap-2">
                  <input
                    className="bg-transparent font-bold"
                    defaultValue={user.fullName}
                    disabled={!isFullNameEdit}
                    {...register('fullName', {
                      required: '이름은 필수 입력 항목입니다',
                      validate: (value) => {
                        const { result } = validateFullName(value);

                        if (result === true) return true;

                        return '이름은 한글이나 영문으로만 입력되어야 합니다';
                      },
                    })}
                  />
                  <HiPencil
                    onClick={() => setIsFullNameEdit(true)}
                    className="shrink-0 cursor-pointer text-sm text-[#ADB0B3]"
                  />
                  {errors.fullName && (
                    <span className="absolute top-full translate-y-full text-sm text-red-600">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </>
        );
    }
  };

  return (
    <>
      {!user ? null : (
        <>
          <div className={`relative box-border flex justify-between pl-5 pr-[18.68px]`}>
            {currentMode === 'view' ? (
              <div
                className="absolute -top-4 left-[17px] flex w-[66px] -translate-y-full cursor-pointer items-center justify-center gap-2"
                onClick={() => {
                  if (isFullNameEdit) return;
                  setCurrentMode('edit');
                }}
              >
                <HiPencil className="shrink-0 text-sm text-[#FC954A]" />
                <span className="text-xs font-semibold text-[#FC954A]">편집</span>
              </div>
            ) : null}
            <div className="w-full">{AvatarArea()}</div>
          </div>
          {isFullNameEdit ? (
            <div className="-mt-[54px] translate-y-[600%]">
              <Button
                type="submit"
                form="editProfile"
                bgColorTheme="orange"
                className="!h-[54px] !rounded-md"
                textColorTheme="white"
                clickHandler={() => {}}
              >
                변경완료
              </Button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Profile;
