import { baseApi } from "../../baseApi/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/settings/privacy-policy",
        method: "GET",
      }),
      providesTags: ["Settings"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/settings/terms-conditions",
        method: "GET",
      }),
      providesTags: ["Settings"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/settings/about-us",
        method: "GET",
      }),
      providesTags: ["Settings"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/settings/privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
    addTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/settings/terms-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    addAboutUs: builder.mutation({
      query: (data) => ({
        url: "/settings/about-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useGetTermsAndConditionsQuery,
  useAddTermsAndConditionsMutation,
  useGetAboutUsQuery,
  useAddAboutUsMutation,
} = settingsApi;
