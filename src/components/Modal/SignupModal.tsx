'use client';
import Button from '@/components/Button/Button';
import styled from '@emotion/styled';
import { ReactElement, ReactNode, useState } from 'react';
import IconButton from '../Button/IconButton';

interface SignupModalProps {
  size: string;
  title: ReactElement;
  content?: ReactNode;
  mainBtn?: string;
  subBtn?: string;
}
//styleComponent
const ModalContainer = styled.div<Pick<SignupModalProps, 'size'>>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  min-width: ${({ size }) => (size === 'small' ? 'auto' : '390px')};
  width: ${({ size }) => (size === 'small' ? '215px' : '92%')};
  height: ${({ size }) => (size === 'small' ? 'auto' : '844px')};
  box-shadow: ${({ size }) => (size === 'small' ? '5px 5px 5px rgba(0,0,0,0.2)' : '0px 0px 10px rgba(0,0,0,0.2)')};
`;
const Title = styled.div<{ size: string }>`
  font-size: ${({ size }) => (size === 'small' ? '20px' : '40px')};
`;
const BtnWrapper = styled.div<{ size: string }>`
  font-size: ${({ size }) => (size === 'small' ? '12px' : '16px')};
`;

function SignupModal({ size, title, content, mainBtn, subBtn }: SignupModalProps) {
  const [showModal, setShowModal] = useState(true);

  if (!showModal) {
    return null;
  }
  return (
    <ModalContainer
      className="border-box align-center mx-auto flex flex-col overflow-y-auto bg-white px-[16px] pt-[50px]"
      size=""
    >
      <Title
        className="align-center flex gap-[25px] border-b-[3px] border-solid border-black p-[6px] font-bold"
        size={size}
      >
        {title}
      </Title>
      {content && <p className="mt-8 font-[16px] leading-7">{content}</p>}

      <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
        <IconButton icon="x" bgColorTheme="none" textColorTheme="black" onClick={console.log} className="h-5 w-5" />
      </button>
    </ModalContainer>
  );
}

export default SignupModal;
