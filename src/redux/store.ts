import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchReducer from './slice/searchSlice';
import symbolReducer from './slice/symbolSlice';
import categoryReducer from './slice/categorySlice';
import newsListFilterReducer from './slice/newsListFilterSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  symbol: symbolReducer,
  category: categoryReducer,
  newsListFilter: newsListFilterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
