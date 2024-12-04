import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
    GetMyBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
    }),
    createBooking: builder.mutation({
      query: (BookingData) => ({
        url: "/bookings",
        method: "POST",
        body: BookingData,
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ BookingId, BookingModifyData }) => ({
        url: `/bookings/${BookingId}`,
        method: "PUT",
        body: BookingModifyData,
      }),
    }),
    deleteBooking: builder.mutation({
      query: (BookingId: string) => ({
        url: `/bookings/${BookingId}`,
        method: "DELETE",
      }),
    }),
    returnBooking: builder.mutation({
      query: (returnData) => ({
        url: "/cars/return",
        method: "PUT",
        body: returnData,
      }),
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useReturnBookingMutation,
} = bookingApi;
