import React, { useState, useEffect, forwardRef, LegacyRef } from "react";
import { ActionInputProps } from "@/app/interfaces/InputProps";
import styles from "./ActionInput.module.css";
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

    switch (
      type //type에 따라 스타일, 플레이스홀더, inputType 변경
    ) {
      case "registerPw":
        placeholder = "";
        inputType = showPassword ? "text" : "password";
        inputClassName = styles.registerInput;
        className = styles.registerInputContainer;
        break;
      case "loginPw":
        placeholder = "";
        inputType = showPassword ? "text" : "password";
        inputClassName = styles.loginInput;
        className = styles.loginInputContainer;
        break;
      case "registerTimer":
        placeholder = "인증코드 입력";
        inputType = "verifyCode";
        inputClassName = styles.registerInput;
        className = styles.registerInputContainer;
        break;
      case "registerVerify":
        placeholder = "";
        inputClassName = styles.verifyInput;
        className = styles.verifyInputContainer;
        break;
      case "registerVerifyAgain":
        placeholder = "";
        inputClassName = styles.registerInput;
        className = styles.registerInputContainer;
        break;
      case "name":
        placeholder = "";
        inputClassName = styles.registerInput;
        className = styles.registerInputContainer;
        break;
      case "mainSearch":
        placeholder = "뉴스/종목(기업명) 검색";
        inputClassName = styles.mainSearchInput;
        className = styles.mainSearchInputContainer;
        break;
      case "selectSearch":
        placeholder = "카테고리를 검색해보세요!";
        inputClassName = styles.selectSearchInput;
        className = styles.selectSearchInputContainer;
        break;
      case "loginEmail":
        placeholder = "";
        inputClassName = styles.loginInput;
        className = styles.loginInputContainer;
        break;
      default:
        break;
    }

    const handleTogglePassword = () => {
      //패스워드 보이기, 숨기기
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    useEffect(() => {
      //타이머
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
      //type에 따른 버튼 구현
      registerPw: (
        <button
          style={{ fontSize: "20px" }}
          onClick={handleTogglePassword}
          className={styles.togglePassword}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      ),
      loginPw: (
        <button
          style={{ fontSize: "20px", right: 14 }}
          onClick={handleTogglePassword}
          className={styles.togglePassword}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      ),
      registerTimer: (
        <div style={{ color: "#b6e0f9" }} className={styles.togglePassword}>
          {Math.floor(timer / 60)
            .toString()
            .padStart(2, "0")}
          :{(timer % 60).toString().padStart(2, "0")}
        </div>
      ),
      registerVerifyAgain: (
        <button
          style={{ color: "#6d6d6d", textDecorationLine: "underline" }}
          className={styles.togglePassword}
        >
          코드 재발송
        </button>
      ),
      registerVerify: (
        <button style={{ color: "#6d6d6d" }} className={styles.verifyEmail}>
          인증
        </button>
      ),
      name: null,
      mainSearch: (
        <button
          style={{ color: "#e5e7ec", fontSize: "22px", right: "1px" }}
          className={styles.togglePassword}
        >
          <MdCancel />
        </button>
      ),
      selectSearch: (
        <button
          style={{ color: "black", fontSize: "16px", right: "8px" }}
          className={styles.verifyEmail}
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
