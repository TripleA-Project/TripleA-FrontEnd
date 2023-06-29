'use client';

import React, { useState, useEffect, forwardRef, LegacyRef } from 'react';
import { ActionInputProps } from '@/interfaces/InputProps';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

const ActionInput = forwardRef(
  ({ type, placeholder, onClick, className, ...props }: ActionInputProps, ref: LegacyRef<HTMLInputElement>) => {
    const [showPassword, setShowPassword] = useState(false);
    const [timer, setTimer] = useState(180);

    let inputPlaceholder = placeholder ?? '';
    let inputType = '';
    let inputClassName = '';
    let containerClassName = '';

    switch (type) {
      case 'registerPw':
        inputType = showPassword ? 'text' : 'password';
        inputClassName = 'w-[200px] h-[30px] text-sm outline-none';
        containerClassName =
          'relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none';
        break;
      case 'loginPw':
        inputType = showPassword ? 'text' : 'password';
        inputClassName = 'w-[180px] h-[30px] outline-none';
        containerClassName =
          'relative w-[253px] h-[38px] border pl-[23px] rounded-[15px] border-solid border-[#dbdee1] outline-none';
        break;
      case 'registerTimer':
        inputPlaceholder = '인증코드 입력';
        inputType = 'verifyCode';
        inputClassName = 'w-[200px] h-[30px] text-sm outline-none';
        containerClassName =
          'relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none';
        break;
      case 'registerVerifyAgain':
        inputClassName = 'w-[200px] h-[30px] text-sm outline-none';
        containerClassName =
          'relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none';
        break;
      case 'registerVerify':
        inputClassName = 'w-[180px] h-[30px] outline-none';
        containerClassName =
          'relative w-[259.67px] h-[34px] border pl-5 rounded-[20px] border-solid border-black outline-none';
        break;
      case 'name':
        inputClassName = 'w-[200px] h-[30px] text-sm outline-none';
        containerClassName =
          'relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none';
        break;
      case 'mainSearch':
        inputPlaceholder = '뉴스/종목(기업명) 검색';
        inputClassName = 'w-[300px] h-[22px] text-[21.84px] outline-none';
        containerClassName = 'relative w-[340px] h-[26px] text-[21.84px] pl-2.5 outline-none';
        break;
      case 'selectSearch':
        inputPlaceholder = '카테고리를 검색해보세요!';
        inputClassName = 'w-[300px] h-7 bg-[#f3f3f3] text-sm outline-none';
        containerClassName =
          'relative w-[337.5px] h-8 border bg-[#f3f3f3] text-sm pl-5 rounded-[15px] border-solid border-[#e4e4e4] outline-none';
        break;
      case 'loginEmail':
        inputClassName = 'w-[180px] h-[30px] outline-none';
        containerClassName =
          'relative w-[253px] h-[38px] border pl-[23px] rounded-[15px] border-solid border-[#dbdee1] outline-none';
        break;
      case 'newsDetailSearch':
        inputClassName = 'w-[300px] h-[30px] outline-none';
        containerClassName =
          'flex absolute left-[40px] top-[80%] translate-y-[-50%] w-[340px] h-[38px] outline-none items-center ';
        break;
      default:
        break;
    }

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    useEffect(() => {
      let intervalId: NodeJS.Timeout | null = null;

      if (type === 'registerTimer') {
        intervalId = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer === 0 && intervalId) {
              clearInterval(intervalId);
              return prevTimer;
            } else {
              return prevTimer - 1;
            }
          });
        }, 1000);
      }
      return () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
      };
    }, [type]);

    const buttonMap = {
      registerPw: (
        <button
          type="button"
          style={{ fontSize: '20px' }}
          onClick={handleTogglePassword}
          className="absolute right-[22px] top-2/4 -translate-y-2/4 items-center justify-center text-[13px] font-bold"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      ),
      loginPw: (
        <button
          type="button"
          style={{ fontSize: '20px', right: 14 }}
          onClick={handleTogglePassword}
          className="absolute right-[22px] top-2/4 -translate-y-2/4 items-center justify-center text-[13px] font-bold"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      ),
      registerTimer: (
        <div
          style={{ color: '#b6e0f9' }}
          className="absolute right-[22px] top-2/4 -translate-y-2/4 items-center justify-center text-[13px] font-bold"
        >
          {Math.floor(timer / 60)
            .toString()
            .padStart(2, '0')}
          :{(timer % 60).toString().padStart(2, '0')}
        </div>
      ),
      registerVerifyAgain: (
        <button
          type="button"
          style={{ color: '#6d6d6d', textDecorationLine: 'underline' }}
          className="absolute right-[22px] top-2/4 -translate-y-2/4 items-center justify-center text-[13px] font-bold"
          onClick={onClick}
        >
          코드 재발송
        </button>
      ),
      registerVerify: (
        <button
          type="button"
          style={{ color: '#6d6d6d' }}
          className="absolute right-5 top-2/4 -translate-y-2/4 text-[13px] underline"
        >
          인증
        </button>
      ),
      name: null,
      mainSearch: null,
      selectSearch: (
        <button
          type="button"
          style={{ color: 'black', fontSize: '16px', right: '8px' }}
          className="absolute right-5 top-2/4 -translate-y-2/4 text-[13px] underline"
          onClick={onClick}
        >
          <FiSearch />
        </button>
      ),
      loginEmail: null,
      newsDetailSearch: (
        <button
          type="button"
          style={{ color: 'black', fontSize: '16px', right: '8px' }}
          className="absolute right-5 top-2/4 -translate-y-2/4 text-[15px] underline"
          onClick={onClick}
        >
          <FiSearch />
        </button>
      ),
    };

    return (
      <div className={containerClassName}>
        <input
          ref={ref}
          type={inputType}
          className={`${inputClassName} ${className}`}
          {...(inputPlaceholder && { placeholder: inputPlaceholder })}
          {...props}
        />
        {buttonMap[type] || null}
      </div>
    );
  },
);

ActionInput.displayName = 'ActionInput';

export default ActionInput;
