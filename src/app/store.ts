import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pollingReducer from '../features/polling/pollingSlice';

export const store = configureStore({
  reducer: {
    polling: pollingReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
