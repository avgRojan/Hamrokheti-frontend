import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {baseQuery} from "../../baseQuery";

const productApi = createApi({
  reducerPath: 'products',
  baseQuery: baseQuery,
  tagTypes: ['products', 'checkReviews','reviews', 'comments'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '/products/product',
        method: 'GET'
      }),
      transformResponse: res=> res.data,
      providesTags: ['products']
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: '/products/product',
        method: 'POST',
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['products']
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/product/${id}`,
        method: 'GET',
      }),
      transformResponse: (res)=> res.data,
      providesTags: ['products']
    }),
    getUserProduct: builder.query({
      query: (data) => ({
        url: `/products/product/my_products`,
        method: 'GET',
      }),
      providesTags: ['products']
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/product/${data?.id}`,
        method: 'PATCH',
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['products']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products']
    }),
    checkUserReview: builder.query({
      query: (product_id) => ({
        url: `/products/reviews/check-review`,
        method: 'POST',
        body: JSON.stringify({product_id})
      }),
      transformResponse: (res)=> res.data,
      providesTags: ['checkReview']
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `/products/reviews/add-review`,
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: ['checkReview', 'reviews']
    }),
    getAllReview: builder.query({
      query: (data) => ({
        url: `/products/reviews/get-product-review`,
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (res)=> res.data,
      providesTags: ['reviews']
    }),
    postComment: builder.mutation({
      query: (data)=> ({
        url: '/products/comment/post-comment',
        method: 'POST',
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['comments']
    }),
    getAllComments: builder.query({
      query: ()=> ({
        url: '/products/comment',
        method: 'GET',
      }),
      transformResponse: (res)=> res.data,
      providesTags: ['comments']
    }),
    giveReply: builder.mutation({
      query: (data) => ({
        url: `/products/comment/${data?.comment}/give-reply`,
        method: 'POST',
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['comments']
    })
  }),
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetSingleProductQuery,
  useGetUserProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCheckUserReviewQuery,
  useAddReviewMutation,
  useGetAllReviewQuery,
  usePostCommentMutation,
  useGetAllCommentsQuery,
  useGiveReplyMutation
} = productApi

export default productApi;
