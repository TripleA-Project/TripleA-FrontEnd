import { type SignupRequest } from '@/interfaces/Dto/Auth';

/**
 * 이메일 유효성 검사
 *
 * [조건]
 *
 * RFC 5322(Internet Message Format)을 만족하는 이메일 형식
 */
export function validateEmail(email: string) {
  const emailRFC5322RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRFC5322RegExp.test(email)) return { result: false, type: 'InvalidEmailFormat' } as const;

  return { result: true };
}

/**
 * 비밀번호 유효성 검사
 *
 * [조건]
 *
 * 1. 8자 이상 16자 이하의 문자열
 *
 * 2. 영문 대소문자, 0-9 숫자, 허용 특수문자의 조합
 *
 * 3. 특수문자는 최소1자 이상 포함되어야 됨
 */
export function validatePassword(password: string) {
  //password 는 8~16자 이내, 영문(대소문자), 숫자, 특수문자(!@#$%^&*-_=+{};:,<.>) 각 1개 이상 포함하여야 함

  if (typeof password !== 'string') return { result: false, type: 'InvalidPasswordType' } as const;
  if (password.length === 0) return { result: false, type: 'RequiredPassword' } as const;

  const passwordLengthRegExp = /^.{8,16}$/;
  const notAllowedCharRegExp = /[^a-zA-Z0-9\!\@\#\$\%\^\&\*\-\_\=\+\{\}\;\:\,\<\.\>\(\)]/g;
  const isContainSpecialRegExp = /[\!@\#\$\%\^\&\*\-\_\=\+\{\}\;\:\,\<\.\>\(\)]/g;

  if (!passwordLengthRegExp.test(password)) return { result: false, type: 'passwordLength' } as const;
  if (notAllowedCharRegExp.test(password)) return { result: false, type: 'notAllowedChar' } as const;
  if (!isContainSpecialRegExp.test(password)) return { result: false, type: 'NotContainSpecial' } as const;

  return { result: true };
}

/**
 * fullName 유효성 검사
 *
 * [조건]
 *
 * 1. 문자이여야 하며 빈 문자가 아니여야 함
 *
 * 2. 공백을 포함 하지 않음
 *
 * 3. 영어 또는 조합된 한글로만 구성된 문자
 */
export function validateFullName(fullName: string) {
  //회원가입 및 개인정보 수정 시 fullName은 영문(대소문자) 혹은 한글로만 작성 가능
  if (typeof fullName !== 'string') return { result: false, type: 'InvalidFullNameType' } as const;
  if (fullName.length === 0) return { result: false, type: 'RequiredFullName' } as const;

  const isContainSpace = fullName.includes(' ');

  if (isContainSpace) return { result: false, type: 'InvalidSpaceFormat' } as const;

  const onlyCombinationAllEngOrAllKorRegExp = /^[a-zA-Z]+$|^[가-힣]+$/g;

  if (!onlyCombinationAllEngOrAllKorRegExp.test(fullName))
    return { result: false, type: 'NotCombinationAllEngOrAllKor' } as const;

  return { result: true };
}

/**
 * 회원가입 유효성 검사
 *
 * 아래 순서로 검사하며 유효하지 않을 경우 `{ result: false, type: type에 해당하는 리터럴문자 }` 를 리턴
 *
 * 유효한 경우 `{ result: true }` 리턴
 *
 * 1. 이메일 유효성 검사 : `validateEmail`
 *
 * 2. 비밀번호 유효성 검사 : `validatePassword`
 *
 * 3. fullName 유효성 검사 : `validateFullName`
 */
export function validateSignup({
  email,
  password,
  passwordCheck,
  fullName,
}: Omit<SignupRequest, 'newsLetter' | 'emailVerified'>) {
  const { result: emailValidateResult, type: emailInvalidReason } = validateEmail(email);
  if (!emailValidateResult) return { result: emailValidateResult, type: emailInvalidReason };

  const { result: passwordValidateResult, type: passwordInvalidReason } = validatePassword(password);
  if (!passwordValidateResult) return { result: passwordValidateResult, type: passwordInvalidReason };

  if (password !== passwordCheck) return { result: false, type: 'NotEqualPasswordCheck' } as const;

  const { result: fullNameValidateResult, type: fullNameInvalidReason } = validateFullName(fullName);
  if (!fullNameValidateResult) return { result: false, type: fullNameInvalidReason };

  return { result: true };
}
