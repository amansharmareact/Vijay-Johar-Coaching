import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./loginSlice"; // Import the default export from your loginSlice file

const store = configureStore({
  reducer: userInfoReducer,
});

export default store;
