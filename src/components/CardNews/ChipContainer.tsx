import { NewsData } from "@/interfaces/NewsData"
import styled from "@emotion/styled"

export default function ChipContainer({symbol, logo}:Pick<NewsData, 'symbol'|'logo'>) {
  return (
    <ChipsWrapper>
      <Chip>
        <div>{symbol}</div>
        <div>{logo}</div>
      </Chip>
      <Chip>
        <div>{symbol}</div>
        <div>{logo}</div>
      </Chip>
    </ChipsWrapper>
  )
}

const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 5px;
`

const Chip = styled.div`
  border-top: 1.5px solid #E5E7EC;
  border-bottom: 1.5px solid #E5E7EC;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  padding: 8px 0;
  position: relative;
  background-color: #fff;
  font-size: 12px;
  margin: 0 20px;
  &::before {
    content: ' ';
    position: absolute;
    z-index:-1;
    left: -14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: red;
    border:1.5px solid #E5E7EC;
  }
  &::after {
    content: ' ';
    position: absolute;
    z-index:-1;
    right: -14px; 
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid #E5E7EC;
    background-color: red;
  }
`

