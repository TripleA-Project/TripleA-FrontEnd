"use client"
import { useState } from "react";
import styled from "@emotion/styled";

const ModalContainer = styled.div`
  border-radius: 15px;
  width: ${({size})=> size === 'small'? '215px' : '390px'};
  height: ${({size})=>size === 'small'? '148px' : '357px'};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold; //semibold
`
const Content = styled.p`
  font-size: 16px;
  text-align: center;

`

function Modal() {
  const [modalSize, setModalSize] = useState('small')



  return (
  <ModalContainer size={modalSize}>
    <Title>title</Title>
    <Content>content</Content>
    <div>button</div>
    <div>subbutton</div>
  </ModalContainer>
  )
}

export default Modal;
