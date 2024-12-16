import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type Product = {
  productId: string;
  email: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  ratings: number;
  mimage: string;
  description: string;
};

type TViewState = {
  viewedProducts: Product[];
};

const initialState: TViewState = {
  viewedProducts: [],
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    addProductToView: (state, action: PayloadAction<Product>) => {
      // Check if the product already exists in the view
      const existingProduct = state.viewedProducts.find(
        (p) => p.productId === action.payload.productId
      );

      if (!existingProduct) {
        // Add new product to the viewed list
        state.viewedProducts.push(action.payload);
      }
    },
    removeProductFromView: (state, action: PayloadAction<string>) => {
      // Remove a specific product by its ID
      state.viewedProducts = state.viewedProducts.filter(
        (product) => product.productId !== action.payload
      );
    },
    clearViewedProducts: (state) => {
      // Clear all viewed products
      state.viewedProducts = [];
    },
  },
});

export const { addProductToView, removeProductFromView, clearViewedProducts } =
  viewSlice.actions;

export default viewSlice.reducer;

export const useCurrentView = (state: RootState) => state.view;
