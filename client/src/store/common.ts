import { createSlice } from '@reduxjs/toolkit';

interface CommonStoreInterface {
  chosenGame: null | 'tic-tac-toe' | 'rock-paper-scissors';
}

const initialState: CommonStoreInterface = {
  chosenGame: null,
};

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setGame(state, action) {
      state.chosenGame = action.payload;
    },
    clearGame(state) {
      state.chosenGame = null;
    },
  },
});

export const { setGame, clearGame } = commonReducer.actions;

export default commonReducer.reducer;
