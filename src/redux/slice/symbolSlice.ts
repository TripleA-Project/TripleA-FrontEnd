import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type SearchedSymbol, type Symbol } from '@/interfaces/Symbol';

type LikedSymbol = Omit<Symbol, 'symbol'>;
type RequestSymbol = Omit<SearchedSymbol, 'symbol'>;

interface LikedSymbolMap {
  [key: string]: LikedSymbol;
}

interface RequestSymbolMap {
  [key: string]: RequestSymbol;
}

type SymbolState = {
  // State 타입
  likedSymbolMap: LikedSymbolMap;
  requestLikeSymbolMap: RequestSymbolMap;
  requestUnLikeSymbolMap: RequestSymbolMap;
  selectedSymbolMap: RequestSymbolMap;
};

type InitLikedSymbolPayload = {
  symbols: (Symbol & { requestId?: number })[];
};

type SymbolPayload = {
  symbol: SearchedSymbol;
};

const initialState: SymbolState = {
  likedSymbolMap: {},
  requestLikeSymbolMap: {},
  requestUnLikeSymbolMap: {},
  selectedSymbolMap: {},
};

export const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    initLikedSymbolMap: (state: SymbolState, action: PayloadAction<InitLikedSymbolPayload>) => {
      if (!action.payload?.symbols || !action.payload.symbols?.length) return;

      for (const symbolPayload of action.payload.symbols) {
        const { symbol, ...symbolData } = symbolPayload;

        const likedSymbols = {
          ...state.likedSymbolMap,
          [symbol]: { ...symbolData },
        } as LikedSymbolMap;

        state.likedSymbolMap = likedSymbols;
      }
    },
    initSelectedSymbolMap: (state: SymbolState) => {
      state.selectedSymbolMap = { ...state.likedSymbolMap };
    },
    selectSymbol: (state: SymbolState, action: PayloadAction<SymbolPayload>) => {
      const { symbol, ...symbolPayload } = action.payload.symbol;

      const isLikedSymbol = !!state.likedSymbolMap[symbol];
      const isUnlikedSymbol = !!state.requestUnLikeSymbolMap[symbol];

      if (!isLikedSymbol) {
        const requestSymbols = { ...state.requestLikeSymbolMap, [symbol]: symbolPayload };

        state.requestLikeSymbolMap = requestSymbols;

        state.selectedSymbolMap = { ...state.selectedSymbolMap, ...state.requestLikeSymbolMap };

        return;
      }

      if (isUnlikedSymbol) {
        state.selectedSymbolMap = { ...state.selectedSymbolMap, [symbol]: symbolPayload };

        const requestUnlikeSymbols = {} as RequestSymbolMap;

        Array.from(Object.entries(state.requestUnLikeSymbolMap))
          .filter(([key, _]) => key !== symbol)
          .forEach(([key, value]) => (requestUnlikeSymbols[key] = value));

        state.requestUnLikeSymbolMap = { ...requestUnlikeSymbols };

        return;
      }
    },
    unSelectSymbol: (state: SymbolState, action: PayloadAction<SymbolPayload>) => {
      const { symbol } = action.payload.symbol;

      const isLikedSymbol = !!state.likedSymbolMap[symbol];
      const isRequestLikeSymbol = !!state.requestLikeSymbolMap[symbol];

      const selectedSymbols = {} as RequestSymbolMap;

      if (isLikedSymbol) {
        const likedSymbol = state.likedSymbolMap[symbol];
        const requestUnLikeSymbols = { ...state.requestUnLikeSymbolMap, [symbol]: { ...likedSymbol } };

        state.requestUnLikeSymbolMap = requestUnLikeSymbols;
      }

      if (isRequestLikeSymbol) {
        const requestLikeSymbols = {} as RequestSymbolMap;

        Array.from(Object.entries(state.requestLikeSymbolMap))
          .filter(([key, _]) => key !== symbol)
          .forEach(([key, value]) => (requestLikeSymbols[key] = value));

        state.requestLikeSymbolMap = { ...requestLikeSymbols };
      }

      Array.from(Object.entries(state.selectedSymbolMap))
        .filter(([key, _]) => key !== symbol)
        .forEach(([key, value]) => (selectedSymbols[key] = value));

      state.selectedSymbolMap = { ...selectedSymbols };
    },
    reset: (state: SymbolState) => {
      state.likedSymbolMap = {};
      state.requestLikeSymbolMap = {};
      state.requestUnLikeSymbolMap = {};
    },
  },
});

export const { initLikedSymbolMap, initSelectedSymbolMap, selectSymbol, unSelectSymbol, reset } = symbolSlice.actions;

export function useSymbolList() {
  const symbolList = useSelector((state: RootState) => state.symbol);
  const dispatch = useDispatch();

  const isLike = (symbol: SearchedSymbol) => {
    return !!symbolList.selectedSymbolMap[symbol.symbol];
  };

  return {
    ...symbolList,
    dispatch,
    isLike,
  };
}

export default symbolSlice.reducer;
