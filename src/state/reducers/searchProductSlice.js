import { createSlice } from "@reduxjs/toolkit";

//Enum like functionality using object
const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  searchKey: "",
  searchProductData: [],
  status: STATUSES.IDLE,
};
const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    productSearchKey(state, action) {
      state.searchKey = action.payload;
      console.log(action.payload);
    },
    productSearchData(state, action) {
      state.searchProductData = action.payload;
      console.log(action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { actions, reducer } = productSearchSlice;
export const { productSearchKey, productSearchData, setStatus } = actions;
export default reducer;

//Thunks
export function fetchProduct() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    let searchKeys = getState().search.searchKey;
    console.log(searchKeys);
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchKeys}`
      );
      const data = await res.json();
      console.log("function started");
      dispatch(productSearchData(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
