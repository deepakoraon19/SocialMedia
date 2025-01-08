import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
        console.log("here")
      state.value = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions

export default userSlice.reducer
