import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState: {},
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userState = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
