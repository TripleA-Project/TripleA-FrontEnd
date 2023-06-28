'use client';
import Button from '@/components/Button/Button';
import styled from '@emotion/styled';
import { ReactElement, ReactNode } from 'react';

interface ModalProps {
  size: string;
  title: ReactElement;
  content?: ReactNode;
  mainBtn: string;
  subBtn?: string;
}
//styleComponent
const ModalContainer = styled.div<Pick<ModalProps, 'size'>>`
  border-radius: ${({ size }) => (size === 'small' ? '16px' : '16px 16px 0 0')};
  min-width: ${({ size }) => (size === 'small' ? 'auto' : '390px')};
  width: ${({ size }) => (size === 'small' ? '215px' : '92%')};
  height: ${({ size }) => (size === 'small' ? 'auto' : '357px')};
  box-shadow: ${({ size }) => (size === 'small' ? '5px 5px 5px rgba(0,0,0,0.2)' : '0px 0px 10px rgba(0,0,0,0.2)')};
`;
const Title = styled.div<{ size: string }>`
  font-size: ${({ size }) => (size === 'small' ? '16px' : '20px')};
`;
const BtnWrapper = styled.div<{ size: string }>`
  font-size: ${({ size }) => (size === 'small' ? '14px' : '16px')};
`;

function Modal({ size, title, content, mainBtn, subBtn }: ModalProps) {
  return (
    <ModalContainer
      className="border-box align-center m-auto flex flex-col justify-evenly bg-white p-[16px]"
      size={size}
    >
      <Title className="align-center flex flex-col gap-[25px] p-[6px] font-bold" size={size}>
        {title}
      </Title>
      {content && <p className="text-center font-[16px]">{content}</p>}
      <BtnWrapper className="flex justify-center" size={size}>
        <Button
          className="large"
          type="button"
          sizeTheme="large"
          bgColorTheme="orange"
          textColorTheme="white"
          onClick={() => {
            alert('메인버튼이 눌렸습니다');
          }}
        >
          {mainBtn}
        </Button>
      </BtnWrapper>
      {subBtn && <div className="rounded-t-xl p-5 px-0 pb-0 pt-1.5 text-xs underline">{subBtn}</div>}
    </ModalContainer>
  );
}

export default Modal;
