import { baseApi } from "../../baseApi/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
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
          url: "/user?role=user",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response?.data,
      providesTags: ["User"],
    }),
    userDelete: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response?.data,
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUserDeleteMutation } = userApi;
