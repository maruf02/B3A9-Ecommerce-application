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

type TWishListState = {
  wishListProducts: Product[];
};

const initialState: TWishListState = {
  wishListProducts: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addProductToWishList: (state, action: PayloadAction<Product>) => {
      // Check if the product already exists in the wish list
      const existingProduct = state.wishListProducts.find(
        (p) => p.productId === action.payload.productId
      );

      if (!existingProduct) {
        // Add new product to the wish list
        state.wishListProducts.push(action.payload);
      }
    },
    removeProductFromWishList: (state, action: PayloadAction<string>) => {
      // Remove a specific product by its ID
      state.wishListProducts = state.wishListProducts.filter(
        (product) => product.productId !== action.payload
      );
    },
    clearWishList: (state) => {
      // Clear all products from the wish list
      state.wishListProducts = [];
    },
  },
});

export const {
  addProductToWishList,
  removeProductFromWishList,
  clearWishList,
} = wishListSlice.actions;

export default wishListSlice.reducer;

export const useCurrentWishList = (state: RootState) => state.wishList;
