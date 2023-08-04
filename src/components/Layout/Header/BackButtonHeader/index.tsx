'use client';

import React from 'react';
import Header from '..';
import { useRouter } from 'next/navigation';
import { BackArrowButton } from './BackButton';

interface BackButtonHeaderProps {
  backBehavior?: () => void;
}

function BackButtonHeader({ backBehavior }: BackButtonHeaderProps) {
  const { back } = useRouter();

  const handleClick = () => {
    if (backBehavior) backBehavior();

    back();
  };

  return (
    <Header fixed>
      <BackArrowButton onClick={handleClick} />
    </Header>
  );
}

export default BackButtonHeader;
