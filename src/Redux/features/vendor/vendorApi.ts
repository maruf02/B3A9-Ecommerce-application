import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllVendor: builder.query({
      query: () => ({
        url: "/vendors",
        method: "GET",
      }),
    }),
    GetVendorByEmail: builder.query({
      query: (email: string) => ({
        url: `/vendors/email/${email}`,
        method: "GET",
      }),
    }),
    GetVendorById: builder.query({
      query: (vendorId: string) => ({
        url: `/vendors/${vendorId}`,
        method: "GET",
      }),
    }),

    addShopName: builder.mutation({
      query: (shopData) => ({
        url: "/vendors",
        method: "POST",
        body: shopData,
      }),
    }),
    updateShopName: builder.mutation({
      query: ({ shopId, shopModifyData }) => ({
        url: `/vendors/${shopId}`,
        method: "PUT",
        body: shopModifyData,
      }),
    }),
    // ****************************************
    createCoupon: builder.mutation({
      query: (CouponData) => ({
        url: "/coupon",
        method: "POST",
        body: CouponData,
      }),
    }),
    GetAllCoupon: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
    }),
    GetCouponById: builder.query({
      query: (CouponId: string) => ({
        url: `/coupon/${CouponId}`,
        method: "GET",
      }),
    }),
    GetCouponByVendorId: builder.query({
      query: (vendorId: string) => ({
        url: `/coupons/vendor/${vendorId}`,
        method: "GET",
      }),
    }),
    updateCoupon: builder.mutation({
      query: ({ CouponId, updateData }) => ({
        url: `/coupon/${CouponId}`,
        method: "PUT",
        body: updateData,
      }),
    }),
    deleteCoupon: builder.mutation({
      query: (couponId: string) => ({
        url: `/coupon/${couponId}`,
        method: "DELETE",
      }),
    }),

    // ***************************************
    createEmail: builder.mutation({
      query: (EmailData) => ({
        url: "/Email",
        method: "POST",
        body: EmailData,
      }),
    }),
    GetAllEmail: builder.query({
      query: () => ({
        url: "/Email",
        method: "GET",
      }),
    }),

    // *********************
  }),
});

export const {
  useGetAllVendorQuery,
  useGetVendorByEmailQuery,
  useAddShopNameMutation,
  useUpdateShopNameMutation,
  useGetVendorByIdQuery,
  useCreateCouponMutation,
  useGetAllCouponQuery,
  useUpdateCouponMutation,
  useGetCouponByIdQuery,
  useDeleteCouponMutation,
  useCreateEmailMutation,
  useGetAllEmailQuery,
  useGetCouponByVendorIdQuery,
} = bookingApi;
