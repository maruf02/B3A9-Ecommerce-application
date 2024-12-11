import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import ErrorPage from "./ErrorPage/ErrorPage.tsx";
import Root from "./Root/Root.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage.tsx";
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import SingUpPage from "./Pages/SingUpPage/SingUpPage.tsx";
import DashBoardRoot from "./Root/DashBoardRoot.tsx";
import AdminDashBoard from "./DashBoardPanel/AdminPanel/AdminDashBoard.tsx";
import VendorDashBoard from "./DashBoardPanel/VendorPanel/VendorDashBoard.tsx";
import UserDashBoard from "./DashBoardPanel/UserPanel/UserDashBoard.tsx";
import UserProtectRoute from "./Components/userProjectRoute/UserProtectRoute.tsx";
import AdminProtectRoute from "./Components/AdminProtectRoute/AdminProtectRoute.tsx";
import VendorProtectRoute from "./Components/vendorProjectRoute/VendorProtectRoute.tsx";
import ManageProduct from "./DashBoardPanel/VendorPanel/ManageProduct/ManageProduct.tsx";
import OrderManagement from "./DashBoardPanel/VendorPanel/OrderManagement/OrderManagement.tsx";
import ManageCategory from "./DashBoardPanel/AdminPanel/ManageCategory/ManageCategory.tsx";
import UserManagement from "./DashBoardPanel/AdminPanel/UserManagement/UserManagement.tsx";
import SalesReport from "./DashBoardPanel/VendorPanel/SalesReport/SalesReport.tsx";
import ProductDetailsViewPage from "./Pages/ProductDetailsViewPage/ProductDetailsViewPage.tsx";
import ShopPage from "./Pages/ShopPage/ShopPage.tsx";
import CartItemPage from "./Pages/CartItemPage/CartItemPage.tsx";
import CheckOutPage from "./Pages/CheckOutPage/CheckOutPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/productDetailsView/:productId",
        element: <ProductDetailsViewPage />,
      },
      {
        path: "/shopPage/:vendorId",
        element: <ShopPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SingUpPage />,
  },
  {
    path: "/DashBoard",
    element: <DashBoardRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/DashBoard/admin",
        element: (
          <AdminProtectRoute>
            <AdminDashBoard />
          </AdminProtectRoute>
        ),
      },
      {
        path: "/DashBoard/admin/ManageCategory",
        element: (
          <AdminProtectRoute>
            <ManageCategory />
          </AdminProtectRoute>
        ),
      },
      {
        path: "/DashBoard/admin/ManageUsers",
        element: (
          <AdminProtectRoute>
            <UserManagement />
          </AdminProtectRoute>
        ),
      },
      {
        path: "/DashBoard/vendor",
        element: (
          <VendorProtectRoute>
            <VendorDashBoard />
          </VendorProtectRoute>
        ),
      },
      {
        path: "/DashBoard/vendor/ManageProducts",
        element: (
          // <VendorProtectRoute>
          <ManageProduct />
          // </VendorProtectRoute>
        ),
      },
      {
        path: "/DashBoard/vendor/OrderManagement",
        element: (
          <VendorProtectRoute>
            <OrderManagement />
          </VendorProtectRoute>
        ),
      },
      {
        path: "/DashBoard/SalesReport",
        element: (
          <VendorProtectRoute>
            <SalesReport />
          </VendorProtectRoute>
        ),
      },
      {
        path: "/DashBoard/user",
        element: (
          <UserProtectRoute>
            <UserDashBoard />
          </UserProtectRoute>
        ),
      },
      {
        path: "/DashBoard/user/Cart",
        element: (
          // <UserProtectRoute>
          <CartItemPage />
          // </UserProtectRoute>
        ),
      },
      {
        path: "/DashBoard/user/CheckOut",
        element: (
          // <UserProtectRoute>
          <CheckOutPage />
          // </UserProtectRoute>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
