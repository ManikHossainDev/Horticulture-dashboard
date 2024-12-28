import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/admin/get-dashboard-data",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getIncomeRatio: builder.query({
      query: (year) => ({
        url: `/admin/getIncomeRatio?year=${year}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getEarningGraphCharts: builder.query({
      query: (year) => ({
        url: `/admin/earning-graph-chart?year=${year}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetIncomeRatioQuery, useGetEarningGraphChartsQuery } =
  dashboardApi;
