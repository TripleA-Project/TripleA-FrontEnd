"use client"
import Button from "@/components/Button/Button";
import styled from "@emotion/styled";

interface ModalProps {
  size: string;
  title: string;
  content?: string;
  mainBtn: string;
  subBtn?: string;
}
const ModalContainer = styled.div<Pick<ModalProps,'size'>>`
  box-sizing: border-box;
  border-radius: ${({size})=> size === 'small'? '16px': '16px 16px 0 0'};
  padding: 16px;
  min-width: ${({size})=>size === 'small'? 'auto': '390px'};
  width: ${({size})=> size === 'small'? '215px' : '92%'};
  height: ${({size})=> size === 'small'? 'auto' : '357px'};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  box-shadow: ${({size})=> size === 'small' ? '5px 5px 5px rgba(0,0,0,0.2)': '0px 0px 10px rgba(0,0,0,0.2)'};
`
const Title = styled.div<{size:string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  font-size: ${({size})=>size==='small'? '16px':'20px'};
  font-weight: 700; 
  padding: 6px;
`
const Content = styled.p`
  font-size: 16px;
  text-align: center;

`
const BtnWrapper = styled.div<{size:string}>`
display: flex;
justify-content: center;
font-size:${({size})=>size === 'small'? '14px': '16px'};

`
const SubBtn = styled.button`
  text-decoration: underline;
  font-size: 12px;
  padding: 6px 0 0 ;
`


function Modal({size, title, content, mainBtn, subBtn}:ModalProps) {




  return (
  <ModalContainer size={size}>
    <Title size={size}>{title}</Title>
    {content && <Content>{content}</Content>}
    <BtnWrapper size={size}>
      <Button className="large" type="button" sizeTheme="large"  bgColorTheme="orange" textColorTheme="white" clickHandler={()=>{ alert('메인버튼이 눌렸습니다')}}>{mainBtn}</Button>
    </BtnWrapper>
    {subBtn && <SubBtn>{subBtn}</SubBtn>}
  </ModalContainer>
  )
}

export default Modal;
