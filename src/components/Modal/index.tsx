"use client"
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
  border-radius: 15px;
  /* border: 1px solid; */
  padding: 15px;
  width: ${({size})=> size === 'small'? '250px' : '390px'};
  height: ${({size})=> size === 'small'? '180px' : '357px'};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  box-shadow: ${({size})=> size === 'small' ? '5px 5px 5px rgba(0,0,0,0.2)': 'none'};
`
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  font-size: 20px;
  font-weight: 600; 
`
const Content = styled.p`
  font-size: 16px;
  text-align: center;

`
const BtnWrapper = styled.div`
display: flex;
justify-content: center;

`
const BtnLarge = styled.button`
  border-radius: 5px;
  width: 90%;
  padding: 10px;
  background-color: #FD954A;
  color: #fff;

`
const SubBtn = styled.button`
  text-decoration: underline;
  font-size: 15px;
`


function Modal({size, title, content, mainBtn, subBtn}:ModalProps) {




  return (
  <ModalContainer size={size}>
    <Title>{title}</Title>
    {content && <Content>{content}</Content>}
    <BtnWrapper>
      <BtnLarge>{mainBtn}</BtnLarge>
    </BtnWrapper>
    {subBtn && <SubBtn>{subBtn}</SubBtn>}
  </ModalContainer>
  )
}

export default Modal;
