export interface symbolInterface {
  symbolId: number,
  symbol: string,
  companyName: string,
  sector: string,
  logo: string,
  marketType: string,
  price: [],

}

export const symbolArr = [
  {
  symbolId:1,
  symbol:'symbol',
  companyName : 'companyName',
  sector : 'sector',
  logo : 'logo',
  marketType : 'marketType',
  price : ['today', 'yesterday'],
  },
  {
  symbolId:2,
  symbol:'symbol',
  companyName : 'companyName',
  sector : 'sector',
  logo : 'logo',
  marketType : 'marketType',
  price : ['today', 'yesterday'],
  },
]