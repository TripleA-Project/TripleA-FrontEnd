import { Metadata } from 'next';
import React from 'react';
import SymbolNewsPage from '@/components/News/SymbolNews/SymbolNewsPage';
import { getSymbol } from '@/service/symbol';
import { HttpStatusCode } from 'axios';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    symbol: string;
    [key: string]: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const symbolName = params?.symbol ?? '';

  return {
    title: `Triple A | ${symbolName} 심볼 뉴스`,
    description: `Triple A ${symbolName} 심볼 뉴스`,
  };
}

async function SymbolNews({ params }: PageProps) {
  return <SymbolNewsPage symbolName={params.symbol} />;
}

export default SymbolNews;
