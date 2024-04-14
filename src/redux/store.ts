import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchReducer from './slice/searchSlice';
import symbolReducer from './slice/symbolSlice';
import categoryReducer from './slice/categorySlice';
import newsListFilterReducer from './slice/newsListFilterSlice';
import pageTabReducer from './slice/pageTabSlice';
import chartSourceReducer from './slice/chartSourceSlice';
import adminUserFilterReducer from './slice/adminUserSearchSlice';
import adminUserListReducer from './slice/adminUserListSlice';
import modalReducer from './slice/modalSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  symbol: symbolReducer,
  category: categoryReducer,
  pageTab: pageTabReducer,
  chartSource: chartSourceReducer,
  newsListFilter: newsListFilterReducer,
  adminUserSearch: adminUserFilterReducer,
  adminUserList: adminUserListReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
