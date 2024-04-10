import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const initialState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {
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
      // Save state to localStorage
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
  },
});

// Export actions and reducer
export const { saveLoginData } = userInfoSlice.actions;
export default userInfoSlice.reducer;
