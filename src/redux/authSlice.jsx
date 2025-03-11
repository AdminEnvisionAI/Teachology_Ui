// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    profile_image: null,
    username: null,
    user_id: null, // Added user_id
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.profile_image = action.payload.profile_image || null;
      state.username = action.payload.username || null;
      state.user_id = action.payload.user_id || null; // Set user_id
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.profile_image = null;
      state.username = null;
      state.user_id = null; // Clear user_id as well
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
export const selectUserId = (state) => state.auth.user_id;