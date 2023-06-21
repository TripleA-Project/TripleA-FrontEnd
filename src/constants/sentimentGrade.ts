export type SentimentGradeLabel = '극긍정' | '긍정' | '중립' | '부정' | '극부정';

export const SentimentGrade = {
  Excellent: { label: '극긍정', color: '#FD954A' },
  Positive: { label: '긍정', color: '#F6DD52' },
  Neutral: { label: '중립', color: '#91DF75' },
  Negative: { label: '부정', color: '#759DEB' },
  ExtremeNegative: { label: '극부정', color: '#786BE4' },
} as const;
