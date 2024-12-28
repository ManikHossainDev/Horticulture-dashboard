import { baseApi } from "../../baseApi/baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      providesTags: ["Services"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: "/service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: ["Services"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useAddServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
