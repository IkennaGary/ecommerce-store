import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer, // Your root reducer goes here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //     // Add other middleware if needed
  // }),
});

export default store;
