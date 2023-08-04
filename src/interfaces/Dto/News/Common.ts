import { type NewsData } from '@/interfaces/NewsData';

export interface NewsPayload {
  news?: NewsData[];
}

export interface CollapseNewsSymbol {
  symbol: string;
  companyName: string;
  logo?: string;
}
export interface CollapseNews extends Omit<NewsData, 'symbol' | 'companyName' | 'logo'> {
  symbolList: CollapseNewsSymbol[];
}

export interface CollapseNewsPayload {
  news?: CollapseNews[];
}
