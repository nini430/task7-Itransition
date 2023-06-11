import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import tictactoeReducer from './tictactoeReducer';
import commonReducer from './common';
import rockPaperScissorsReducer from './rockPaperScissorsReducer';

const store = configureStore({
  reducer: {
    common: commonReducer,
    tictactoe: tictactoeReducer,
    rps:rockPaperScissorsReducer
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
