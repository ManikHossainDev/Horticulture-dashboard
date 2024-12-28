import { baseApi } from "../../baseApi/baseApi";

const businessmanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinessman: builder.query({
      query: ({ page = 1, limit = 10, filters }) => {
        const params = new URLSearchParams();

        // Add page and limit to params
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);

        // Add any filters like name and email
        if (filters) {
          filters.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/user?role=businessman",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response?.data,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllBusinessmanQuery } =
  businessmanApi;
