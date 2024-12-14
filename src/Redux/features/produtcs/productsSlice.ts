// src/Redux/features/products/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
