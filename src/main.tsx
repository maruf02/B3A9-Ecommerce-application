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

import ShopPage from "./Pages/ShopPage/ShopPage.tsx";
// import CheckOutPage from "./Pages/CheckOutPage/CheckOutPage.tsx";
import AllProductPage from "./Components/AllProductPage/AllProductPage.tsx";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage.tsx";
import CartViewPage from "./Pages/CartViewPage/CartViewPage.tsx";
import CheckOutPage from "./Pages/CheckOutPage/CheckOutPage.tsx";
import CommentPage from "./Pages/CommentPage/CommentPage.tsx";
import CustomerReviewsPage from "./Pages/CustomerReviewsPage/CustomerReviewsPage.tsx";
import UserOrderManagement from "./DashBoardPanel/UserPanel/UserOrderManagement/UserOrderManagement.tsx";
import ReviewActivities from "./DashBoardPanel/AdminPanel/ReviewActivities/ReviewActivities.tsx";
import TransactionMonitor from "./DashBoardPanel/AdminPanel/TransactionMonitor/TransactionMonitor.tsx";
import FlashSalePage from "./Pages/FlashSalePage/FlashSalePage.tsx";
import RecentViewPage from "./Pages/RecentViewPage/RecentViewPage.tsx";
import ProductComparePage from "./Pages/ProductComparePage/ProductComparePage.tsx";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage.tsx";
import VendorManagement from "./DashBoardPanel/AdminPanel/VendorManagement.tsx";
import AllShopPage from "./Components/AllShopPage/AllShopPage.tsx";
import WishListPage from "./Pages/WishListPage/WishListPage.tsx";
import UserProfile from "./DashBoardPanel/UserPanel/UserProfile/UserProfile.tsx";
import AdminProfilePage from "./DashBoardPanel/AdminPanel/AdminProfilePage/AdminProfilePage.tsx";
import VendorProfilePage from "./DashBoardPanel/VendorPanel/VendorProfilePage/VendorProfilePage.tsx";
import CouponManagement from "./DashBoardPanel/VendorPanel/CouponManagement/CouponManagement.tsx";
import NewsLetterPage from "./DashBoardPanel/AdminPanel/NewsLetterPage/NewsLetterPage.tsx";

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
        path: "/products",
        element: <AllProductPage />,
      },
      {
        path: "/shop",
        element: <AllShopPage />,
      },
      {
        path: "/compareProduct",
        element: <ProductComparePage />,
      },
      {
        path: "/ProductDetailsView/:productId",
        element: <ProductDetailsPage />,
      },

      {
        path: "/shopPage/:shopName/:vendorId",
        element: <ShopPage />,
      },
      {
        path: "/flashsale",
        element: <FlashSalePage />,
      },
      {
        path: "/recentView",
        element: <RecentViewPage />,
      },
      {
        path: "/wishList",
        element: <WishListPage />,
      },
      {
        path: "/cartView",
        element: <CartViewPage />,
      },
      {
        path: "/commentPage",
        element: <CommentPage />,
      },
      {
        path: "/checkout",
        element: <CheckOutPage />,
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
    path: "/reset-password",
    element: <ResetPasswordPage />,
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
        path: "/DashBoard/admin/adminProfile",
        element: (
          <AdminProtectRoute>
            <AdminProfilePage />
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
        path: "/DashBoard/ReviewActivities",
        element: (
          <AdminProtectRoute>
            <ReviewActivities />
          </AdminProtectRoute>
        ),
      },
      {
        path: "/DashBoard/TransactionMonitor",
        element: (
          <AdminProtectRoute>
            <TransactionMonitor />
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
        path: "/DashBoard/admin/ManageVendors",
        element: (
          <AdminProtectRoute>
            <VendorManagement />
          </AdminProtectRoute>
        ),
      },
      {
        path: "/DashBoard/admin/newsLetter",
        element: (
          <AdminProtectRoute>
            <NewsLetterPage />
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
        path: "/DashBoard/vendor/vendorProfile",
        element: (
          <VendorProtectRoute>
            <VendorProfilePage />
          </VendorProtectRoute>
        ),
      },
      {
        path: "/DashBoard/vendor/coupon",
        element: (
          <VendorProtectRoute>
            <CouponManagement />
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
        path: "/DashBoard/vendor/CustomerReview",
        element: (
          <VendorProtectRoute>
            <CustomerReviewsPage />
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
        path: "/DashBoard/user/userProfile",
        element: (
          <UserProtectRoute>
            <UserProfile />
          </UserProtectRoute>
        ),
      },
      {
        path: "/DashBoard/user/cartView",
        element: (
          <UserProtectRoute>
            <CartViewPage />
          </UserProtectRoute>
        ),
      },
      {
        path: "/DashBoard/user/purchaseManagement",
        element: (
          <UserProtectRoute>
            <UserOrderManagement />
          </UserProtectRoute>
        ),
      },
      // {
      //   path: "/DashBoard/user/Cart",
      //   element: (
      //     <UserProtectRoute>
      //     <CartItemPage />
      //     </UserProtectRoute>
      //   ),
      // },
      // {
      //   path: "/DashBoard/user/CheckOut",
      //   element: (
      //     <UserProtectRoute>
      //     <CheckOutPage />
      //     </UserProtectRoute>
      //   ),
      // },
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
