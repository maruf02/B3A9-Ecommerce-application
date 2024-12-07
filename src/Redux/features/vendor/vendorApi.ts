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

    addShopName: builder.mutation({
      query: (shopData) => ({
        url: "/vendors",
        method: "POST",
        body: shopData,
      }),
    }),

    // *********************
  }),
});

export const {
  useGetAllVendorQuery,
  useGetVendorByEmailQuery,
  useAddShopNameMutation,
} = bookingApi;
