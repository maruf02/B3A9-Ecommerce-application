import { baseApi } from "../../api/baseApi";

const produtcsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),

    // *********************
  }),
});

export const { useGetAllBookingsQuery } = produtcsApi;
