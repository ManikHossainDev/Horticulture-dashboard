import { baseApi } from "../../baseApi/baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFaq: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],

    }),
    getAllFaq: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["Faq"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getSingleFaq: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      providesTags: ["Faq"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
} = faqApi;
