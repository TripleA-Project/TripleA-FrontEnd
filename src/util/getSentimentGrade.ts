const sentimentGradeCriteria = {
  Excellent: { more: 4.5, lessThan: 10 },
  Positive: { more: 3.5, lessThan: 4.5 },
  Neutral: { more: 1.5, lessThan: 4.5 },
  Negative: { more: 0.5, lessThan: 1.5 },
  ExtremeNegative: { more: -10, lessThan: 0.5 },
};

export function getSentimentGrade(sentiment: number) {
  const { Excellent, Positive, Neutral, Negative, ExtremeNegative } = sentimentGradeCriteria;

  if (Excellent.more <= sentiment) return 'Excellent';
  if (Positive.more <= sentiment) return 'Positive';
  if (Neutral.more <= sentiment) return 'Neutral';
  if (Negative.more <= sentiment) return 'Negative';
  if (ExtremeNegative.more <= sentiment) return 'ExtremeNegative';
}
