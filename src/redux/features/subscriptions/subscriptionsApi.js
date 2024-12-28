import { baseApi } from "../../baseApi/baseApi";

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["Subscriptions"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    getSingleSubscription: builder.query({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "GET",
      }),
      providesTags: ["Subscriptions"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscription/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriptions"],
    }),
  }),
});
export const {
  useGetSubscriptionsQuery,
  useAddSubscriptionMutation,
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionsApi;
