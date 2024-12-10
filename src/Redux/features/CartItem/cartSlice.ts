// src/Redux/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TCartState = {
  vendorId: string | null;
  productIds: string[];
};

const initialState: TCartState = {
  vendorId: null,
  productIds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{ vendorId: string; productId: string }>
    ) => {
      const { vendorId, productId } = action.payload;

      if (state.vendorId === null) {
        // First product added, set vendorId and productId
        state.vendorId = vendorId;
        state.productIds = [productId];
      } else if (state.vendorId === vendorId) {
        // Same vendor, add the productId if it's not already in the array
        if (!state.productIds.includes(productId)) {
          state.productIds.push(productId);
        }
      } else {
        // Different vendor, clear cart and set new vendorId and productId
        state.vendorId = vendorId;
        state.productIds = [productId];
      }
    },
    clearCart: (state) => {
      state.vendorId = null;
      state.productIds = [];
    },
  },
});

export const { addProductToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const useCurrentCart = (state: RootState) => state.cart;
