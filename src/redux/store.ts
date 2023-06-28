import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/rootSlice';
import cardReducer from './slice/cardSlice'
import searchReducer from './slice/searchSlice'; 
const rootReducer = combineReducers({
  counter: counterReducer,
  card: cardReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
