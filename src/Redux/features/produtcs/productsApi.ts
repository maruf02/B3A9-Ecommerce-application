import { baseApi } from "../../api/baseApi";

const produtcsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
    // category section
    createCategory: builder.mutation({
      query: (CategoryData) => ({
        url: "/categories",
        method: "POST",
        body: CategoryData,
      }),
    }),
    GetAllCategory: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
    GetCategoryById: builder.query({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}`,
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, CategoryModifyData }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: CategoryModifyData,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
    }),
    // category section
    // *********************
    // **********product section***********

    // **********product section***********
    // *********************************************************
  }),
});

export const {
  useGetAllBookingsQuery,
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = produtcsApi;
