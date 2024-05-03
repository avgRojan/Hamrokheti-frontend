import {createApi} from "@reduxjs/toolkit/query/react"
import {baseQuery} from "../../baseQuery";


const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: baseQuery,
  tagTypes: ['vegetableMarket', 'news','newsDetails'],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => ({
        url: '/news/news',
        method: 'GET',
      }),
      providesTags: ['news'],
      transformResponse: (res) => res.data
    }),
    getVegetableMarket: builder.query({
      query: () => ({
        url: '/news/vegetable-market',
        method: 'GET',
      }),
      providesTags: ['vegetableMarket'],
      transformResponse: (data) => {
        return data?.data
      },
    }),
    scrapeVegetableMarket: builder.mutation({
      query: () => ({
        url: '/news/vegetable-market/scrape',
        method: 'GET',
      }),
      invalidatesTags: ['vegetableMarket']
    }),
    scrapeNews: builder.mutation({
      query: () => ({
        url: '/news/news/scrape',
        method: 'GET',
      }),
      invalidatesTags: ['news']
    }),
    deleteNews: builder.mutation({
      query: (id)=> ({
        url: `/news/news/${id}/delete-news`,
        method: 'DELETE',
      }),
      invalidatesTags: ['news']
    }),
    addNews: builder.mutation({
      query: (data) => ({
        url: '/news/news/add-news',
        method: 'POST',
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['news']
    }),
    getSingleNews: builder.query({
      query: (id)=> ({
        url: `/news/news/${id}`,
        method: 'GET',
      }),
      providesTags: ['newsDetails'],
      transformResponse: (res)=> res.data,
    }),
    updateNews: builder.mutation({
      query: (data) => ({
        url: `/news/news/${data?.id}/update-news`,
        method: 'POST',
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['news', ['newsDetails']]
    })
  }),
})

export const {
  useGetNewsQuery,
  useGetVegetableMarketQuery,
  useScrapeVegetableMarketMutation,
  useScrapeNewsMutation,
  useDeleteNewsMutation,
  useAddNewsMutation,
  useGetSingleNewsQuery,
  useUpdateNewsMutation
} = newsApi

export default newsApi
