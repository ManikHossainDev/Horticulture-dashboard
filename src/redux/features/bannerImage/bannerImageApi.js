import { baseApi } from "../../baseApi/baseApi";

const bannerImageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBannerImage: builder.mutation({
      query: (data) => {
        return {
          url: "/bannerImage", // Make sure the URL matches the backend endpoint
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["BannerImage"],
    }),
    getBannerImage: builder.query({
      query: () => ({
        url: "/bannerImage", // Adjust URL as needed
        method: "GET",
      }),
      providesTags: ["BannerImage"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getSingleBannerImage: builder.query({
      query: (id) => ({
        url: `/bannerImage/${id}`,
        method: "GET",
      }),
      providesTags: ["BannerImage"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateBannerImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bannerImage/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["BannerImage"],
    }),
    deleteBannerImage: builder.mutation({
      query: (id) => ({
        url: `/bannerImage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BannerImage"],
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useAddBannerImageMutation,
  useGetBannerImageQuery,
  useUpdateBannerImageMutation,
  useGetSingleBannerImageQuery,
  useDeleteBannerImageMutation,
} = bannerImageApi;
