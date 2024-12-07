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
          <VendorProtectRoute>
            <ManageProduct />
          </VendorProtectRoute>
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
        path: "/DashBoard/user",
        element: (
          <UserProtectRoute>
            <UserDashBoard />
          </UserProtectRoute>
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
