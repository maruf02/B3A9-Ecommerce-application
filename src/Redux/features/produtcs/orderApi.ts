import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),

    // *************************************************************

    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments",
        method: "POST",
        body: commentData,
      }),
    }),
    getAllComments: builder.query({
      query: () => "/comments",
    }),
    updateComment: builder.mutation({
      query: ({ commentId, comment }) => ({
        url: `/comments/${commentId}`,
        method: "PUT",
        body: { comment },
      }),
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
    }),

    replyComment: builder.mutation({
      query: (replyData) => ({
        url: `/replyComments`,
        method: "POST",
        body: replyData,
      }),
    }),
    replyCommentByCID: builder.query({
      query: (commentId) => `/replyComments/${commentId}`,
    }),
    getCommentsByPostId: builder.query({
      query: (productId) => `/commentsGetByProductId/${productId}`,
    }),

    // ******************************
  }),
});

export const {
  useGetAllBookingsQuery,
  useCreateOrderMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
  useGetCommentsByPostIdQuery,
  useReplyCommentByCIDQuery,
  useReplyCommentMutation,
  useUpdateCommentMutation,
} = orderApi;
