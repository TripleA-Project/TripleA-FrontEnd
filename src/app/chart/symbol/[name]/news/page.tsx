import { Metadata } from 'next';
import React from 'react';

export const revalidate = 0;

interface PageProps {
  params: {
    name: string;
    [key: string]: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const symbolName = params?.name ?? '';

  return {
    title: `${symbolName} 심볼 뉴스`,
    description: `Triple A ${symbolName} 심볼 뉴스`,
  };
}

function SymbolNews({ params }: PageProps) {
  console.log({ params });
  return <div>SymbolNews</div>;
}

export default SymbolNews;
