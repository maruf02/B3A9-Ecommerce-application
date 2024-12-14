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

    GetAllOrder: builder.query({
      query: ({ page, limit }) => ({
        url: `/orders?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    GetAllLoginActivities: builder.query({
      query: () => ({
        url: "/loginActivities",
        method: "GET",
      }),
    }),
    // **********************************
    GetAllFlashSaleProduct: builder.query({
      query: () => ({
        url: "/FlashSaleProducts",
        method: "GET",
      }),
    }),

    orderProductByVendorEmail: builder.query({
      query: ({ email, page, limit }) =>
        `/ordersProductByVendorEmail/${email}?page=${page}&limit=${limit}`,
    }),
    orderProductByUserEmail: builder.query({
      query: ({ email, page, limit }) =>
        `/ordersProductByUserEmail/${email}?page=${page}&limit=${limit}`,
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
    // ************follow/Unfollow******************
    startFollow: builder.mutation({
      query: (followShopData) => ({
        url: "/followShop",
        method: "POST",
        body: followShopData,
      }),
    }),

    GetfollowerByVendorId: builder.query({
      query: (vendorId: string) => ({
        url: `/followShop/vendor/${vendorId}`,
        method: "GET",
      }),
    }),

    followStatus: builder.query({
      query: (vendorId) => `/followShopStatus/${vendorId}`,
    }),

    startUnfollow: builder.mutation<void, { userId: string; vendorId: string }>(
      {
        query: ({ userId, vendorId }) => ({
          url: `/followShop/user/${userId}/vendor/${vendorId}`,
          method: "DELETE",
        }),
      }
    ),

    // ************follow/Unfollow******************
    // ******************************
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
  useOrderProductByVendorEmailQuery,
  useOrderProductByUserEmailQuery,
  useFollowStatusQuery,
  useStartFollowMutation,
  useStartUnfollowMutation,
  useGetAllOrderQuery,
  useGetAllLoginActivitiesQuery,
  useGetfollowerByVendorIdQuery,
  useGetAllFlashSaleProductQuery,
} = orderApi;
