import styled from '@emotion/styled';
import { getSentimentColor } from '@/util/news';
interface BarProps {
  sentiment: number;
}
interface ColorBarProps {
  sentimentColor: string;
}

const ColorBar = styled.div<ColorBarProps>`
  background-color: ${({ sentimentColor }) => sentimentColor};
`;

export default function Bar({ sentiment }: BarProps) {

  const sentimentColor = getSentimentColor(sentiment);

  return <ColorBar sentimentColor={sentimentColor} className="mr-[10px] h-full w-[5px] rounded-[5px]" />;
}
