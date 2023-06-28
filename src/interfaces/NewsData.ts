//NOTE -  초기값들이 어떻게 들어오는 지 확인하기

export interface NewsData {
  newsId : number;
  symbol: string;
  companyName: string;
  logo?:string;
  source: string;
  title: string;
  description: string;
  thumbnail?:string;
  publishedDate: string;
  sentiment:number;
  bookmark: {
    count: number;
    isBookmark: boolean;
  };
}


export interface Bookmark {
  count: number;
  isBookmark: boolean;
}