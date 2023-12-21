import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/categorySlice";
import searchReducer from "./reducers/searchProductSlice";

const store = configureStore({
  reducer: {
    reducer,
    search: searchReducer,
  },
});

export default store;
