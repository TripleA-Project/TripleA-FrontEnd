export interface SymbolPrice {
  date: string;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  adjClose: number;
  adjHigh: number;
  adjLow: number;
  adjOpen: number;
  adjVolume: number;
  divCash: number;
  splitFactor: number;
}

export interface Symbol {
  symbolId: number;
  symbol: string;
  companyName?: string;
  sector: string | null;
  logo?: string;
  marketType: string;
  price: { today: SymbolPrice; yesterday: SymbolPrice };
}

export interface SearchedSymbol extends Omit<Symbol, 'price'> {}
