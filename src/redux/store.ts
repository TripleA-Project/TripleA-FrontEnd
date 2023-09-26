import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchReducer from './slice/searchSlice';
import symbolReducer from './slice/symbolSlice';
import categoryReducer from './slice/categorySlice';
import newsListFilterReducer from './slice/newsListFilterSlice';
import pageTabReducer from './slice/pageTabSlice';
import chartSourceReducer from './slice/chartSourceSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  symbol: symbolReducer,
  category: categoryReducer,
  pageTab: pageTabReducer,
  chartSource: chartSourceReducer,
  newsListFilter: newsListFilterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
