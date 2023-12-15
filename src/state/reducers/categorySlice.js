import { createSlice } from "@reduxjs/toolkit";
export const categorySelection = createSlice({
  name: "category",
  initialState: { category: "skincare" },
  reducers: {
    selectedCategory: (state, { payload }) => {
      console.log(payload);
      console.log(state.category);
      state.category = payload;
    },
  },
});

const { actions, reducer } = categorySelection;
export const { selectedCategory } = actions;
export default reducer;
