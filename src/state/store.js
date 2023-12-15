import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/categorySlice";
const store = configureStore({
  reducer: {
    reducer,
  },
});

export default store;
