import { NewsData } from "@/interfaces/NewsData"


export default function ChipContainer({symbol, logo}:Partial<NewsData>) {
  return (
    <div>
      <div>{symbol}</div>
      <div>{logo}</div>
    </div>
  )
}


