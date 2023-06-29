import { NewsData } from '@/interfaces/NewsData';
import styled from '@emotion/styled';
import Image from 'next/image';

export default function ChipContainer({ symbol, logo = 'ddd' }: Pick<NewsData, 'symbol' | 'logo'>) {
  return (
    <ChipsWrapper>
      <Chip>
        <Image src={logo} alt="logo" className="h-[16px] w-[16px]" />
        <div>{symbol}</div>
      </Chip>
    </ChipsWrapper>
  );
}

const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 10px;
  z-index: -1;
`;

const Chip = styled.div`
  box-sizing: border-box;
  height: 28px;
  border: 1.5px solid #e5e7ec;
  border-radius: 9999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
  font-size: 12px;
  margin: 0 20px;
  padding: 0 5px;
  div {
    background-color: #fff;
    z-index: 9;
    padding: 3.5px 0;
  }
  /* &::before {
    content: '';
    position: absolute;
    left: -14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid #e5e7ec;
  }
  &::after {
    content: '';
    position: absolute;
    right: -14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid #e5e7ec;
  } */
`;
