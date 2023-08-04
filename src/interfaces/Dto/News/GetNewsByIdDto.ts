import { AxiosResponse } from 'axios';

export interface GetNewsByIdSearchParam {
  id: number;
}

export interface NewsByIdPayload {
  category: string;
  content: string;
  description: string;
  id: number;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  publishedDate: string;
  sentiment: number;
  source: string;
  summary: string;
  symbol: string;
  thumbnail: string;
  title: string;
  url: string;
}

export interface GetNewsByIdResponse extends NewsByIdPayload {}
