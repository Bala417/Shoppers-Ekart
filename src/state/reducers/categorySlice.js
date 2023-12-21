import { createSlice } from "@reduxjs/toolkit";

export const categorySelection = createSlice({
  name: "category",
  initialState: { category: "skincare", cart: [] },
  reducers: {
    selectedCategory: (state, { payload }) => {
      state.category = payload;
    },
    cartReducer: (state, { payload }) => {
      const product = { ...payload, qty: 1 };

      const existingProduct = state.cart.find((item) => item.id === payload.id);

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        state.cart.push(product);
      }
    },
    increaseQty: (state, { payload }) => {
      const productToUpdate = state.cart.find((item) => item.id === payload);
      if (productToUpdate.qty < productToUpdate.stock) {
        if (productToUpdate) {
          productToUpdate.qty += 1;
        }
      }
    },
    decreaseQty: (state, { payload }) => {
      const productToUpdate = state.cart.find((item) => item.id === payload);
      if (productToUpdate.qty >= 2) {
        if (productToUpdate) {
          productToUpdate.qty -= 1;
        }
      }
    },
    removeCartItem: (state, { payload }) => {
      state.cart = state.cart.filter((product) => product.id !== payload);
      console.log(state.cart);
    },
  },
});

const { actions, reducer } = categorySelection;
export const {
  selectedCategory,
  cartReducer,
  increaseQty,
  decreaseQty,
  removeCartItem,
} = actions;
export default reducer;
