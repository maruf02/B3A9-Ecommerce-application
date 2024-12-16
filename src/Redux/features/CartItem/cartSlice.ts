import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type Vendor = {
  vendorId: string;
  shopName: string;
  email: string;
};

type User = {
  userId: string;
  email: string;
};

type Product = {
  productId: string;
  shopName: string;
  email: string;
  name: string;
  category: string;
  mimage: string;
  price: number;
  quantity: number;
  requiredQty: number;
};

type TCartState = {
  savedVendor: Vendor | null;
  savedUser: User | null;
  savedProducts: Product[];
};

const initialState: TCartState = {
  savedVendor: null,
  savedUser: null,
  savedProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{ user: User; vendor: Vendor; product: Product }>
    ) => {
      const { user, vendor, product } = action.payload;

      if (!state.savedVendor || !state.savedUser) {
        // First product added, set user, vendor, and product
        state.savedVendor = vendor;
        state.savedUser = user;
        state.savedProducts = [{ ...product, requiredQty: 1 }];
      } else if (
        state.savedVendor.vendorId === vendor.vendorId &&
        state.savedUser.userId === user.userId
      ) {
        // Same user and vendor, add or update the product
        const existingProduct = state.savedProducts.find(
          (p) => p.productId === product.productId
        );

        if (existingProduct) {
          // Update required quantity if the product already exists
          existingProduct.requiredQty += product.requiredQty;
        } else {
          // Add new product
          state.savedProducts.push({ ...product, requiredQty: 1 });
        }
      } else {
        // Different user or vendor, clear cart and save new user, vendor, and product
        state.savedVendor = vendor;
        state.savedUser = user;
        state.savedProducts = [{ ...product, requiredQty: 1 }];
      }
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      // Remove a specific product by its ID
      state.savedProducts = state.savedProducts.filter(
        (product) => product.productId !== action.payload
      );

      // If no products left, clear the vendor and user
      if (state.savedProducts.length === 0) {
        state.savedVendor = null;
        state.savedUser = null;
      }
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.savedVendor = null;
      state.savedUser = null;
      state.savedProducts = [];
    },
    setUser: (state, action: PayloadAction<User>) => {
      // Set or update user information
      state.savedUser = action.payload;
    },
    setVendor: (state, action: PayloadAction<Vendor>) => {
      // Set or update vendor information
      state.savedVendor = action.payload;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  clearCart,
  setUser,
  setVendor,
} = cartSlice.actions;

export default cartSlice.reducer;

export const useCurrentCart = (state: RootState) => state.cart;
