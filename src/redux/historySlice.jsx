import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    updateHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { updateHistory } = historySlice.actions;

// Selector to get the history array from the state
export const selectHistory = (state) => {
  return state.history; // Corrected selector to return state.history
};

export default historySlice.reducer;
