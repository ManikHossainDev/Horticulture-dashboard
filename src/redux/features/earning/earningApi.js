import { baseApi } from "../../baseApi/baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: () => ({
        url: "/admin/get-all-earnings",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const { useGetAllEarningsQuery } = earningApi;
