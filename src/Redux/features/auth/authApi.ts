import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signin",
        method: "POST",
        body: userInfo,
      }),
    }),

    postLoginActivity: builder.mutation({
      query: (loginActivityInfo) => ({
        url: `/loginActivity`,
        method: "POST",
        body: loginActivityInfo,
      }),
    }),

    // Query to get all login activities
    getLoginActivities: builder.query({
      query: () => `/loginActivities`,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetLoginActivitiesQuery,
  usePostLoginActivityMutation,
} = authApi;
