import { createSlice } from "@reduxjs/toolkit";

export const userNameSlice = createSlice({
  name: "userName",
  initialState: "",
  reducers: {
    setUserName: (state, action) => { 
      state = action.payload;
      return state;
    }
  }
});

export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;