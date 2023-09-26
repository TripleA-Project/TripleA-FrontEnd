import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';
import type { SearchedSymbol, Symbol } from '@/interfaces/Symbol';

interface SymbolMap {
  [key: string]: Symbol;
}

interface RequestSymbolMap {
  [key: string]: SearchedSymbol;
}

type SymbolState = {
  // State 타입
  likedSymbolMap: SymbolMap;
  requestLikeSymbolMap: RequestSymbolMap;
  requestUnLikeSymbolMap: RequestSymbolMap;
  selectedSymbolMap: RequestSymbolMap;
};

type InitLikedSymbolPayload = {
  symbols: Symbol[];
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
      if (!action.payload?.symbols) {
        state.likedSymbolMap = { ...initialState.likedSymbolMap };

        return;
      }

      if (!Array.isArray(action.payload.symbols) || !action.payload.symbols.length) {
        state.likedSymbolMap = { ...initialState.likedSymbolMap };

        return;
      }

      for (const symbolPayload of action.payload.symbols) {
        const likedSymbols = {
          ...state.likedSymbolMap,
          [symbolPayload.symbol]: { ...symbolPayload },
        };

        state.likedSymbolMap = likedSymbols;
      }
    },
    initSelectedSymbolMap: (state: SymbolState) => {
      state.selectedSymbolMap = { ...state.likedSymbolMap };
    },
    selectSymbol: (state: SymbolState, action: PayloadAction<SymbolPayload>) => {
      const symbolPayload = action.payload.symbol;

      const isLikedSymbol = !!state.likedSymbolMap[symbolPayload.symbol];
      const isUnlikedSymbol = !!state.requestUnLikeSymbolMap[symbolPayload.symbol];

      if (!isLikedSymbol) {
        const requestSymbols = { ...state.requestLikeSymbolMap, [symbolPayload.symbol]: symbolPayload };

        state.requestLikeSymbolMap = requestSymbols;

        state.selectedSymbolMap = { ...state.selectedSymbolMap, ...state.requestLikeSymbolMap };

        return;
      }

      if (isUnlikedSymbol) {
        state.selectedSymbolMap = { ...state.selectedSymbolMap, [symbolPayload.symbol]: symbolPayload };

        const requestUnlikeSymbols = {} as RequestSymbolMap;

        Array.from(Object.entries(state.requestUnLikeSymbolMap))
          .filter(([key, _]) => key !== symbolPayload.symbol)
          .forEach(([key, value]) => (requestUnlikeSymbols[key] = value));

        state.requestUnLikeSymbolMap = { ...requestUnlikeSymbols };

        return;
      }
    },
    unSelectSymbol: (state: SymbolState, action: PayloadAction<SymbolPayload>) => {
      const symbolPayload = action.payload.symbol;

      const isLikedSymbol = !!state.likedSymbolMap[symbolPayload.symbol];
      const isRequestLikeSymbol = !!state.requestLikeSymbolMap[symbolPayload.symbol];

      const selectedSymbols = {} as RequestSymbolMap;

      if (isLikedSymbol) {
        const likedSymbol = state.likedSymbolMap[symbolPayload.symbol];

        const { price, ...likedSymbolPayload } = likedSymbol;

        const requestUnLikeSymbols = {
          ...state.requestUnLikeSymbolMap,
          [symbolPayload.symbol]: { ...likedSymbolPayload },
        };

        state.requestUnLikeSymbolMap = requestUnLikeSymbols;
      }

      if (isRequestLikeSymbol) {
        const requestLikeSymbols = {} as RequestSymbolMap;

        Array.from(Object.entries(state.requestLikeSymbolMap))
          .filter(([key, _]) => key !== symbolPayload.symbol)
          .forEach(([key, value]) => (requestLikeSymbols[key] = value));

        state.requestLikeSymbolMap = { ...requestLikeSymbols };
      }

      Array.from(Object.entries(state.selectedSymbolMap))
        .filter(([key, _]) => key !== symbolPayload.symbol)
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
