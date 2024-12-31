// src/Redux/features/products/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
  searchText: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload; // Update search text
    },
  },
});

export const { setSelectedCategory, setSearchText } = productsSlice.actions;
export default productsSlice.reducer;
