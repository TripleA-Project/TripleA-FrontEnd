import { NewsData } from "@/interfaces/NewsData"
import styled from "@emotion/styled"

export default function ChipContainer({symbol, logo='ddd'}:Pick<NewsData, 'symbol'|'logo'>) {
  return (
    <ChipsWrapper>
      <Chip>
        <div>{logo}</div>
        <div>{symbol}</div>
      </Chip>
      <Chip>
        <div>{logo}</div>
        <div>{symbol}</div>
      </Chip>
      <Chip>
        <div>{logo}</div>
        <div>{symbol}</div>
      </Chip>
    </ChipsWrapper>
  )
}

const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 5px;
  z-index: -1;
`

const Chip = styled.div`
box-sizing: border-box;
height: 28px;
  border-top: 1.5px solid #E5E7EC;
  border-bottom: 1.5px solid #E5E7EC;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
  font-size: 12px;
  margin: 0 20px;
  div {
    background-color: #fff;
    z-index: 9;
    padding: 3.5px 0;
  }
  &::before {
    content: '';
    position: absolute;
    left: -14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border:1.5px solid #E5E7EC;
  }
  &::after {
    content: '';
    position: absolute;
    right: -14px; 
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid #E5E7EC;

  }
`

