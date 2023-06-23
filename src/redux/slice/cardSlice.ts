import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';

type DirectionState = {
  // State 타입
  cardDirection: string; 
};

const initialState: DirectionState = {
  cardDirection : 'row'
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setDirection : (state,action) => {
      state.cardDirection = action.payload
    },
  },
});

export const { setDirection } = cardSlice.actions;

// 커스텀 훅 형태로 만들어주기 (Hooks 폴더로 따로 빼도 됨)
// export function useCard() {
//   const dispatch = useDispatch();
//   const {cardDirection} = useSelector((state: RootState) => state.card);

//   return {
//     cardDirection,
//     dispatch,
//   };
// }

export default cardSlice.reducer;
