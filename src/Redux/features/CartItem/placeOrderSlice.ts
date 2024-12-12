import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaceOrderState {
  orderData: {
    totalItems: number;
    user: {
      userId: string;
      email: string;
    };
    vendor: {
      vendorId: string;
      email: string;
      shopName: string;
    };
    items: Array<{
      productId: string;
      mimage: string;
      name: string;
      requiredQty: number;
      price: number;
    }>;
    totalPrice: number;
  } | null;
}

const initialState: PlaceOrderState = {
  orderData: null,
};

const placeOrderSlice = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {
    setOrderData(state, action: PayloadAction<PlaceOrderState["orderData"]>) {
      state.orderData = action.payload;
      localStorage.setItem("orderData", JSON.stringify(action.payload));
    },
    clearOrderData(state) {
      state.orderData = null;
      localStorage.removeItem("orderData");
    },
  },
});
export type { PlaceOrderState };

export const { setOrderData, clearOrderData } = placeOrderSlice.actions;
export default placeOrderSlice.reducer;
