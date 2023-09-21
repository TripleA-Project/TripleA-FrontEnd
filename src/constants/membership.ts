export enum GradeSummaryMembership {
  'PREMIUM' = '유료회원',
  'BASIC' = '일반회원',
  'NON_MEMBER' = '비회원',
}

export const MembershipGradeSummaryOrders: (keyof typeof GradeSummaryMembership)[] = ['PREMIUM', 'BASIC', 'NON_MEMBER'];

export const MembershipGradeSummaryTemplate = {
  PREMIUM: [
    `뉴스 요약문 무제한 제공`,
    `관심 심볼 및 카테고리 무제한 제공`,
    `기사 북마크 기능 무제한 제공`,
    `차트보기 제공`,
    `챗GPT AI 뉴스분석 일 10회 제공`,
  ],
  BASIC: [`뉴스 요약문 매일 10개 제공`, `관심 심볼 및 카테고리 3개까지 제공`, `북마크 기능 무제한 제공`],
  NON_MEMBER: [`뉴스 리스트 무제한 조회`],
};
