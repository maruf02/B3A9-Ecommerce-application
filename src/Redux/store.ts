import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./features/CartItem/cartSlice";
import placeOrderReducer from "./features/CartItem/placeOrderSlice";
import viewReducer from "./features/CartItem/viewSlice";
import productReducer from "./features/produtcs/productsSlice";

const persistConfig = {
  key: "auth",
  storage,
};
const persistConfigCart = {
  key: "cart",
  storage,
  whitelist: ["savedVendor", "savedProducts", "savedUser"],
};
const persistConfigPlaceOrder = {
  key: "placeOrder",
  storage,
  whitelist: ["orderData"],
};
const persistConfigView = {
  key: "view",
  storage,
  whitelist: ["viewedProducts"],
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(persistConfigCart, cartReducer);
const persistedplaceOrderReducer = persistReducer(
  persistConfigPlaceOrder,
  placeOrderReducer
);
const persistedViewReducer = persistReducer(persistConfigView, viewReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // auth: authReducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    order: persistedplaceOrderReducer,
    view: persistedViewReducer,
    // placeOrder: placeOrderReducer,

    product: productReducer,
    // placeOrder: placeOrderReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// persist oprion
export const persistor = persistStore(store);
