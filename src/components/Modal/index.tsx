"use client"
import Button from "@/components/Button/Button";
import styled from "@emotion/styled";
import { ReactElement, ReactNode} from "react";

interface ModalProps {
  size: string;
  title: ReactElement;
  content?: ReactNode;
  mainBtn: string;
  subBtn?: string;
}
//styleComponent
const ModalContainer = styled.div<Pick<ModalProps,'size'>>`
  border-radius: ${({size})=> size === 'small'? '16px': '16px 16px 0 0'};
  min-width: ${({size})=>size === 'small'? 'auto': '390px'};
  width: ${({size})=> size === 'small'? '215px' : '92%'};
  height: ${({size})=> size === 'small'? 'auto' : '357px'};
  box-shadow: ${({size})=> size === 'small' ? '5px 5px 5px rgba(0,0,0,0.2)': '0px 0px 10px rgba(0,0,0,0.2)'};
`
const Title = styled.div<{size:string}>`
  font-size: ${({size})=>size==='small'? '16px':'20px'};
`
const BtnWrapper = styled.div<{size:string}>`
  font-size:${({size})=>size === 'small'? '14px': '16px'};
`


function Modal({size, title, content, mainBtn, subBtn}:ModalProps) {

  return (
  <ModalContainer className="bg-white m-auto p-[16px] border-box flex flex-col justify-evenly align-center" size={size} >
    <Title className="flex flex-col align-center gap-[25px] font-bold p-[6px]" size={size}>{title}</Title>
    {content && <p className="font-[16px] text-center">{content}</p>}
    <BtnWrapper className="flex justify-center" size={size}>
      <Button className="large" type="button" sizeTheme="large"  bgColorTheme="orange" textColorTheme="white" clickHandler={()=>{ alert('메인버튼이 눌렸습니다')}}>{mainBtn}</Button>
    </BtnWrapper>
    {subBtn && <div className="underline text-xs pt-1.5 pb-0 px-0 p-5 rounded-t-xl">{subBtn}</div>}
  </ModalContainer>
  )
}

export default Modal;
