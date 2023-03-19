import { createSlice } from "@reduxjs/toolkit";

export const avatarSlice = createSlice({
  name: "avatar",
  initialState: "faUser",
  reducers: {
    setAvatar: (state, action) => {
      state = action.payload;
      return state;
    }
  }
});

export const { setAvatar } = avatarSlice.actions;

export default avatarSlice.reducer;