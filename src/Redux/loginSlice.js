import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  loginData: {
    message: "",
    email: "",
    image: "",
    token: "",
    status: null,
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

// Export actions and reducer
export const { saveLoginData } = userInfoSlice.actions;
export default userInfoSlice.reducer;
