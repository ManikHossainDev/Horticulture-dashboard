import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://api.hortspec.com/api/v1`,
  // baseUrl: `http://192.168.10.163:7575/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
// Enhanced base query with token refresh logic
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle various error statuses
  if (result?.error?.status === 404) {
    toast.error(result.error.data?.message || "Not Found");
  }
  if (result?.error?.status === 403) {
    toast.error(result.error.data?.message || "Forbidden");
  }
  if (result?.error?.status === 409) {
    toast.error(result.error.data?.message || "Conflict");
  }
  if (result?.error?.status === 401) {
    window.location.href = "/auth";
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "User",
    "Categories",
    "Products",
    "Businessman",
    "Faq",
    "Orders",
    "Settings",
    "BannerImage",
    "Services",
    "Subscription",
  ],
  endpoints: () => ({}),
});
