import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: {
    token: "",
    coachImg: "",
    coachName: "",
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    saveLoginData: (state, action) => {
      state.loginData = action.payload;
    },
  },
});

export const { saveLoginData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
