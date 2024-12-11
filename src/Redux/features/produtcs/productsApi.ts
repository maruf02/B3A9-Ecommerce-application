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
      query: ({ categoryId, categoryModifyData }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: categoryModifyData,
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

    // product section
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),
    duplicateProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),
    // GetAllProduct: builder.query({
    //   query: () => ({
    //     url: "/products",
    //     method: "GET",
    //   }),
    // }),
    GetAllProductQuery: builder.query({
      query: ({ page, limit }) => ({
        url: `/products?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    GetAllProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    GetProductById: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),

    // ***********************
    getProductsByCartIds: builder.query({
      query: (productIds) => ({
        url: "/cartProducts/cartItem",
        method: "GET",
        params: { productIds: productIds.join(",") },
      }),
    }),
    // ***********************
    GetProductByVendorId: builder.query({
      query: (vendorId: string) => ({
        url: `/productsByShopName/${vendorId}`,
        method: "GET",
      }),
    }),

    GetProductByVendorIdPaginate: builder.query({
      query: ({ vendorId, page, limit }) => ({
        url: `/productsByShopNameP/${vendorId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    GetProductByShopName: builder.query({
      query: (email: string) => ({
        url: `/productsByShopName/email/${email}`,
        method: "GET",
      }),
    }),
    GetProductByShopNamePaginate: builder.query({
      query: ({ email, page, limit }) => ({
        url: `/productsByShopName/email/${email}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ productId, productsModifyData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: productsModifyData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
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
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useGetProductByShopNameQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductQueryQuery,
  useGetProductByVendorIdQuery,
  useGetProductsByCartIdsQuery,
  useDuplicateProductMutation,
  useGetProductByShopNamePaginateQuery,
  useGetProductByVendorIdPaginateQuery,
} = produtcsApi;
