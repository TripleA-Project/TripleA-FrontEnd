import { NewsData } from "@/interfaces/NewsData"


export default function ChipContainer({symbol, logo}:Pick<NewsData, 'symbol'|'logo'>) {
  return (
    <div>
      <div>{symbol}</div>
      <div>{logo}</div>
    </div>
  )
}


