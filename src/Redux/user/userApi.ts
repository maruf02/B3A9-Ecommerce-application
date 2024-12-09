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
    updatePassword: builder.mutation({
      query: ({ email, password }) => ({
        url: `/auth/usersPass/${email}`,
        method: "PUT",
        body: { password },
      }),
    }),
    changePassword: builder.mutation({
      query: () => ({
        url: "/change-password",
        method: "PUT",
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
  useUpdatePasswordMutation,
  useGetAllUserQuery,
  useSignUpUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi;
