interface ResponseKeyValue {
  Key: 'success' | 'fail';
  Value: string[];
}

export interface DeleteStibeeAddressRequest {
  deleteEmailList: string[];
}

export interface DeleteStibeeAddressResponse {
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
   * `code` 에러 코드
   *
   * `message` 에러 메시지
   */
  Error: {
    code: string;
    message: string;
  } | null;
  /**
   * 요청에 대한 결과(Key-Value타입의 배열)
   *
   * Key 값
   *
   * `success` 구독자 완전삭제 성공 리스트
   * `fail` 구독자 완전삭제 실패 리스트
   */
  Value: Record<ResponseKeyValue['Key'], ResponseKeyValue['Value']>;
}
