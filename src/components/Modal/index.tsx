"use client"
import { useState } from "react";
import styled from "@emotion/styled";

const ModalContainer = styled.div`
  box-sizing: border-box;
  border-radius: 15px;
  border: 1px solid;
  padding: 15px;
  width: ${({size})=> size === 'small'? '250px' : '390px'};
  height: ${({size})=> size === 'small'? '180px' : '357px'};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* background-color: red; */
  text-align: center;
`
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  font-size: 20px;
  font-weight: bold; //semibold
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


function Modal({size, title, content, mainBtn, subBtn}) {




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
