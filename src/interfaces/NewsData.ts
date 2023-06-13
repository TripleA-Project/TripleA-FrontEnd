export interface NewsData {
  newsId : number;
  symbol?: string;
  logo?:string;
  source?: string;
  title: string;
  description?: string;
  thumbnail?:string;
  publishedDate: string;
  sentiment?:number;
  bookmark?: {
    count?: number;
    isBookmark?: boolean;
}

export interface Bookmark {
  count?: number;
  isBookmark?: boolean;
}