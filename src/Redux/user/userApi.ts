import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GetAllUser: builder.query({
    //   query: () => ({
    //     url: "/auth/users",
    //     method: "GET",
    //   }),
    // }),
    signUpUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/change-password",
        method: "POST",
        body: payload,
      }),
    }),
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: "/update-password",
        method: "PUT",
        body: payload,
      }),
    }),
    GetAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    GetUserEmail: builder.query({
      query: (email: string) => ({
        url: `/users/email/${email}`,
        method: "GET",
      }),
    }),
    GetUserByUserId: builder.query({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ userId, userModifyData }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: userModifyData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserEmailQuery,

  useGetAllUserQuery,
  useSignUpUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useGetUserByUserIdQuery,
  useUpdatePasswordMutation,
} = authApi;
