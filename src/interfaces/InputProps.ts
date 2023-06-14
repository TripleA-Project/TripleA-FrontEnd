import React from 'react';

/**
 * `type`: "name" 로그인창 비밀번호, 회원가입 비밀번호, 회원가입 인증코드 타이머, 회원가입 이메일 인증, 회원가입 인증 코드 재발송
 *
 * `onClick`: 버튼을 클릭했을때 핸들링할 함수를 사용자가 정의하여 해당 props로 전달 (event객체는 React.MouseEvent\<HTMLButtonElement\>타입, event.target: HTMLButtonElement 타입)
 */
export interface ActionInputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onClick'> {
  type:
    | 'loginPw'
    | 'registerPw'
    | 'registerTimer'
    | 'registerVerify'
    | 'registerVerifyAgain'
    | 'name'
    | 'mainSearch'
    | 'selectSearch'
    | 'loginEmail';
  onClick?: (e: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }) => void;
}
