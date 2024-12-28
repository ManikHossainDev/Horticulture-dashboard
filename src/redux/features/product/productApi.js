import { baseApi } from "../../baseApi/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (formdata) => {
        return {
          url: "/product",
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: ({ page, limit }) => ({
        url: "/product",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Products"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateProduct: builder.mutation({
      query: ({ id, formdata }) => {
        return {
          url: `/product/${id}`,
          method: "PATCH",
          body: formdata,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (formdata) => ({
        url: "/product/add-image",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteSingleImage: builder.mutation({
      query: ({ id, imageName }) => {
        return {
          url: `/product/delete-image?id=${id}&imageName=${imageName}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
  useDeleteSingleImageMutation,
} = productApi;
