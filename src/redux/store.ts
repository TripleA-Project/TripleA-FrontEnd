import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slice/rootSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
