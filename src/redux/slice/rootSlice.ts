import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';

type CounterState = {
  // State 타입
  count: number;
};
type CounterPayload = {
  // Payload 타입
  diff: number;
};

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state: CounterState) => {
      state.count = state.count + 1;
    },
    decrease: (state: CounterState) => {
      state.count = state.count - 1;
    },
    // PayloadAction 타입 명시
    increaseByDiff: (state: CounterState, action: PayloadAction<CounterPayload>) => {
      state.count = state.count + action.payload.diff;
    },
    decreaseByDiff: (state: CounterState, action: PayloadAction<CounterPayload>) => {
      state.count = state.count - action.payload.diff;
    },
  },
});

export const { increase, decrease, increaseByDiff, decreaseByDiff } = counterSlice.actions;

// 커스텀 훅 형태로 만들어주기 (Hooks 폴더로 따로 빼도 됨)
export function useCounter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return {
    count,
    dispatch,
  };
}

export default counterSlice.reducer;
