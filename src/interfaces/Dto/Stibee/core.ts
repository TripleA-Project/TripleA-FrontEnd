export interface KnownStibeeUserInfo {
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
