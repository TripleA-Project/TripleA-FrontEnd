'use client'

import React, { useState, useEffect, forwardRef, LegacyRef } from "react";
import { ActionInputProps } from "@/app/interfaces/InputProps";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const ActionInput = forwardRef(
  (
    { type, value, onChange }: ActionInputProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [timer, setTimer] = useState(180);
    let placeholder = "";
    let inputType = "";
    let inputClassName = "";
    let className = "";

    switch (type) {
      case "registerPw":
        placeholder = "";
        inputType = showPassword ? "text" : "password";
        inputClassName = "w-[200px] h-[30px] text-sm outline-none";
        className =
          "relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none";
        break;
      case "loginPw":
        placeholder = "";
        inputType = showPassword ? "text" : "password";
        inputClassName = "w-[180px] h-[30px] outline-none";
        className =
          "relative w-[253px] h-[38px] border pl-[23px] rounded-[15px] border-solid border-[#dbdee1] outline-none";
        break;
      case "registerTimer":
        placeholder = "인증코드 입력";
        inputType = "verifyCode";
        inputClassName = "w-[200px] h-[30px] text-sm outline-none";
        className =
          "relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none";
        break;
      case "registerVerifyAgain":
        placeholder = "";
        inputClassName = "w-[200px] h-[30px] text-sm outline-none";
        className =
          "relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none";
        break;
      case "registerVerify":
        placeholder = "";
        inputClassName = "w-[180px] h-[30px] outline-none";
        className =
          "relative w-[259.67px] h-[34px] border pl-5 rounded-[20px] border-solid border-black outline-none";
        break;
      case "name":
        placeholder = "";
        inputClassName = "w-[200px] h-[30px] text-sm outline-none";
        className =
          "relative w-[323px] h-[34px] border text-sm pl-[23px] rounded-[20px] border-solid border-[black] outline-none";
        break;
      case "mainSearch":
        placeholder = "뉴스/종목(기업명) 검색";
        inputClassName = "w-[300px] h-[22px] text-[21.84px] outline-none";
        className =
          "relative w-[340px] h-[26px] text-[21.84px] pl-2.5 outline-none";
        break;
      case "selectSearch":
        placeholder = "카테고리를 검색해보세요!";
        inputClassName = "w-[300px] h-7 bg-[#f3f3f3] text-sm outline-none";
        className =
          "relative w-[337.5px] h-8 border bg-[#f3f3f3] text-sm pl-5 rounded-[15px] border-solid border-[#e4e4e4] outline-none";
        break;
      case "loginEmail":
        placeholder = "";
        inputClassName = "w-[180px] h-[30px] outline-none";
        className =
          "relative w-[253px] h-[38px] border pl-[23px] rounded-[15px] border-solid border-[#dbdee1] outline-none";
        break;
      default:
        break;
    }

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    useEffect(() => {
      let intervalId: NodeJS.Timeout | null = null;

      if (type === "registerTimer") {
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
          style={{ fontSize: "20px" }}
          onClick={handleTogglePassword}
          className="justify-center items-center absolute -translate-y-2/4 text-[13px] font-bold right-[22px] top-2/4"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      ),
      loginPw: (
        <button
          style={{ fontSize: "20px", right: 14 }}
          onClick={handleTogglePassword}
          className="justify-center items-center absolute -translate-y-2/4 text-[13px] font-bold right-[22px] top-2/4"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      ),
      registerTimer: (
        <div
          style={{ color: "#b6e0f9" }}
          className="justify-center items-center absolute -translate-y-2/4 text-[13px] font-bold right-[22px] top-2/4"
        >
          {Math.floor(timer / 60)
            .toString()
            .padStart(2, "0")}
          :{(timer % 60).toString().padStart(2, "0")}
        </div>
      ),
      registerVerifyAgain: (
        <button
          style={{ color: "#6d6d6d", textDecorationLine: "underline" }}
          className="justify-center items-center absolute -translate-y-2/4 text-[13px] font-bold right-[22px] top-2/4"
        >
          코드 재발송
        </button>
      ),
      registerVerify: (
        <button
          style={{ color: "#6d6d6d" }}
          className="text-[13px] underline absolute -translate-y-2/4 right-5 top-2/4"
        >
          인증
        </button>
      ),
      name: null,
      mainSearch: (
        <button
          style={{ color: "#e5e7ec", fontSize: "22px", right: "1px" }}
          className="justify-center items-center absolute -translate-y-2/4 text-[13px] font-bold right-[22px] top-2/4"
        >
          <MdCancel />
        </button>
      ),
      selectSearch: (
        <button
          style={{ color: "black", fontSize: "16px", right: "8px" }}
          className="text-[13px] underline absolute -translate-y-2/4 right-5 top-2/4"
        >
          <FiSearch />
        </button>
      ),
      loginEmail: null,
    };

    return (
      <div className={className}>
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClassName}
        />
        {buttonMap[type] || null}
      </div>
    );
  }
);

ActionInput.displayName = "ActionInput";

export default ActionInput;
