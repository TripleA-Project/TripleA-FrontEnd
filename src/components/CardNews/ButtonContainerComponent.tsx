
import { Bookmark } from "@/interfaces/NewsData"

interface ButtonContainerProps {
  newsId: string
  bookmark?: Bookmark
}

export default function ButtonContainer({newsId,bookmark}:ButtonContainerProps){
  return (
    <div>
      <button>{bookmark?.isBookmark}</button>
      <button>{bookmark?.count}</button>
    </div>
  )
}
