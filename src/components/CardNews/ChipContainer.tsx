import Image from "next/image"
import styled from "@emotion/styled"
import { NewsData } from "@/interfaces/NewsData"

export default function ChipContainer({symbol, logo}:Pick<NewsData, 'symbol'|'logo'>) {
  return (
    <ChipsWrapper>
      <Chip>
        <div></div>
        <div>{symbol}</div>
      </Chip>
      <Chip>
        <span>{}</span>
        <div>{symbol}</div>
      </Chip>
      <Chip>
        <div>{}</div>
        <div>{symbol}</div>
      </Chip>
    </ChipsWrapper>
  )
}

const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 20px;

`

const Chip = styled.div`
  height: 28px;
  width: fit;
  border-radius: 14px;
  border: 1.5px solid #E5E7EC;
  /* border-bottom: 1.5px solid #E5E7EC; */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  position: relative;
  font-size: 12px;
  margin: 0 20px;
  padding: 0 10px;
`

