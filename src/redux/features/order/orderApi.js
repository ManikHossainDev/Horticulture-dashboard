import { baseApi } from "../../baseApi/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/order",
      }),
      providesTags: ["Orders"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
