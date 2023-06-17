import { MEMBERSHIP } from '@/interfaces/User';
import { type APIResponse } from '../Core';
import { type NewsData } from '@/interfaces/NewsData';
import { type Symbol } from '@/interfaces/Symbol';
import { type Category } from '@/interfaces/Category';

// 상세 뉴스
export interface NewsDetailParam {
  id: number;
}

interface NewsDetailSymbol extends Omit<Symbol, 'symbolId' | 'symbol'> {
  name: string;
}

interface NewsDetailTranlateResult {
  title: string;
  description: string;
  summary: string;
  content: string;
  keyword: [string, string, string];
}

interface UserPayload {
  user: {
    membership: keyof typeof MEMBERSHIP;
    leftBenefitCount: number | null;
    historyNewsIds?: number[];
  };
}

interface NewsDetailPayload extends Omit<NewsData, 'symbol' | 'logo' | 'description' | 'title'> {
  symbol: NewsDetailSymbol;
  category: Category;
  url: string;
  eng: NewsDetailTranlateResult;
  kor: NewsDetailTranlateResult;
}

export interface NewsDetailResponse extends APIResponse<UserPayload & NewsDetailPayload> {}
