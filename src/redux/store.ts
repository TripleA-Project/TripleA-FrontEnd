import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/rootSlice';
import cardReducer from './slice/cardSlice'
const rootReducer = combineReducers({
  counter: counterReducer,
  card: cardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
