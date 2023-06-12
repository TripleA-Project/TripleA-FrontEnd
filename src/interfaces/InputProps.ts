export interface ActionInputProps {
  type:
    | "loginPw"
    | "registerPw"
    | "registerTimer"
    | "registerVerify"
    | "registerVerifyAgain"
    | "name" //로그인창 비밀번호, 회원가입 비밀번호, 회원가입 인증코드 타이머, 회원가입 이메일 인증, 회원가입 인증 코드 재발송
    | "mainSearch"
    | "selectSearch"
    | "loginEmail";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
