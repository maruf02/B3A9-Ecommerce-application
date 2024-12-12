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

    // *********************
  }),
});

export const {
  useGetAllVendorQuery,
  useGetVendorByEmailQuery,
  useAddShopNameMutation,
  useUpdateShopNameMutation,
  useGetVendorByIdQuery,
} = bookingApi;
