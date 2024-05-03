import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQuery} from "../baseQuery";

const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQuery,
  tagTypes: ['dashboard'],
  endpoints: (builder) => ({
    getDashboardCounts: builder.query({
      query: () => ({
        url: '/dashboard/counts',
        method: 'GET',
        headers:{
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
      }),
      transformResponse: (res) => res.data
    })
  }),
})

export const {
  useGetDashboardCountsQuery

} = dashboardApi

export default dashboardApi;
