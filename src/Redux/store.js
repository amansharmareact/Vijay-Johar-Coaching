import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./loginSlice"; // Import the default export from your userInfoSlice file

// Configure the store
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});

export default store;
