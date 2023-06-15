//types
import { Bookmark } from "@/interfaces/NewsData"

//components
import IconButton from "@/components/Button/IconButton"

//styles
import styled from "@emotion/styled"

interface ButtonContainerProps {
  newsId: number;
  bookmark: Bookmark; //count, isBookmark
}


export default function ButtonContainer({newsId,bookmark}:ButtonContainerProps){
  const count = bookmark?.count
  const isBookmark = bookmark?.isBookmark
  return (
    <Container>
      <IconButton icon='export' bgColorTheme='none' textColorTheme='black'/>
      {isBookmark ? 
        <IconButton icon='bookmarkfill' bgColorTheme='none' textColorTheme='black' ></IconButton>:
        <IconButton icon='bookmark' bgColorTheme='none' textColorTheme='black'></IconButton>
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`