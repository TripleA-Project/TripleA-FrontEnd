interface KnownUserInfoKeyValue {
  /**
   * 이메일
   */
  email: string;
  /**
   * 이름
   */
  name?: string;
  /**
   * 광고성 정보 수신 동의 여부
   */
  $ad_agreed?: 'Y' | 'N';
}

interface ResponseKeyValue {
  Key:
    | 'success'
    | 'update'
    | 'failNoEmail'
    | 'failExistEmail'
    | 'failExistPhone'
    | 'failWrongEmail'
    | 'failWrongPhone'
    | 'failDuplicatedEmail'
    | 'failDuplicatedPhone'
    | 'failUnknown';
  Value: KnownUserInfoKeyValue[];
}

export interface PostStibeeAddressRequest {
  /**
   * 구독자를 추가할 방법
   *
   * `MANUAL` (기본값) 관리자에 의해 추가
   *
   * `SUBSCRIBER` 구독자가 직접 구독
   */
  eventOccuredBy?: 'MANUAL' | 'SUBSCRIBER';
  /**
   * 구독 확인 이메일 발송 여부
   *
   * `Y` 구독자에게 구독 확인 이메일을 발송, 구독자가 해당 메일을 통해 구독확인을 해야 구독자로 추가 됨
   *
   * `N` (기본값) 구독 확인 과정 없이 바로 구독자로 추가
   */
  confirmEmailYN?: 'Y' | 'N';
  /**
   * 그룹 ID에 해당하는 그룹에 구독자를 추가하여 할당
   *
   * (기본값) 할당 안 함
   */
  groupIds?: number;
  /**
   * 구독자 정보 (Key-Value타입의 배열)
   *
   * `$ad_agreed` (기본값: 'N') 광고성 정보 수신 여부
   */
  subscribers: KnownUserInfoKeyValue[];
}

export interface PostStibeeAdressResponse {
  /**
   * 요청 성공 실패 여부
   *
   * `true` 성공
   *
   * `false` 실패
   */
  Ok: boolean;
  /**
   * Ok 가 false 인 경우 에러 내용
   *
   * `Code` 에러 코드
   *
   * `Message` 에러 메시지
   */
  Error: {
    code: string;
    message: string;
  } | null;
  /**
   * 요청에 대한 결과 (Key-Value타입의 배열)
   *
   * Key 값
   *
   * `success` 구독자 추가 성공
   *
   * `update` 상태 외 정보 업데이트
   *
   * `failNoEmail` 구독자 추가 실패 - 이메일 주소 없음
   *
   * `failExistEmail` 구독자 추가 실패 - 이미 구독 중인 이메일 주소
   *
   * `failExistPhone` 구독자 추가 실패 - 이미 구독 중인 전화번호
   *
   * `failWrongEmail` 구독자 추가 실패 - 이메일 주소 형식 오류
   *
   * `failWrongPhone` 구독자 추가 실패 - 전화번호 형식 오류
   *
   * `failDuplicatedEmail` 구독자 추가 실패 - 이메일 주소 중복 요청
   *
   * `failDuplicatedPhone` 구독자 추가 실패 - 전화번호 중복 요청
   *
   * `failUnknown` 구독자 추가 실패 - 알수 없는 오류
   */
  Value: Record<ResponseKeyValue['Key'], ResponseKeyValue['Value']> | null;
}
