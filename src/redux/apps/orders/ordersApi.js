import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {baseQuery} from "../baseQuery";

const orderApi = createApi({
  reducerPath: 'orders',
  baseQuery: baseQuery,
  tagTypes: ['orders', 'farmerOrders', 'partnerOrders'],
  endpoints: (builder) => ({
    requestOrder: builder.mutation({
      query: (data) => ({
        url: '/orders/order/request',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      invalidatesTags: ['orders']
    }),
    getCustomerOrders: builder.query({
      query: () => ({
        url: '/orders/order/my-orders',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      transformResponse : (res) => res.data,
      providesTags: ['orders']
    }),
    cancelOrders: builder.mutation({
      query: (id) => ({
        url: `/orders/order/${id}/cancel`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['orders']
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: '/orders/order/get-all',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      transformResponse : (res) => res.data,
      providesTags: ['orders']
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/order/${id}/delete`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['orders']
    }),
    getFarmersOrder: builder.query({
      query: () => ({
        url: `/orders/order/get-farmer-orders`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      transformResponse : (res) => res.data,
      providesTags: ['farmerOrders']
    }),
    getPartnersOrder: builder.query({
      query: () => ({
        url: `/orders/order/get-partner-orders`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      transformResponse : (res) => res.data,
      providesTags: ['partnerOrders']
    }),
    processingOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/order/${id}/processing-order`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['farmerOrders']
    }),
    deliveredOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/order/${id}/delivered-order`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags:['farmerOrders', 'orders','partnerOrders']
    }),
    shippedOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/order/${id}/shipped-order`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['partnerOrders']
    }),
    rejectOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/order/${id}/reject-order`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags:['farmerOrders']
    }),
    completeOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/order/${id}/complete-order`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['farmerOrders']
    }),
    getPartnerInfoByOrderId: builder.query({
      query: (id) => ({
        url: `/orders/order/${id}/get-partner-info`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      transformResponse : (res) => res.data,
    }),
    getCustomerInfoByOrderId: builder.query({
      query: (id) => ({
        url: `/orders/order/${id}/get-customer-info`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      transformResponse : (res) => res.data,
    }),
    createEsewaOrder: builder.query({
      query: (id) => ({
        url: `/orders/order/create-esewa-order?data=${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    })
  }),
})

export const {
  useRequestOrderMutation,
  useGetCustomerOrdersQuery,
  useCancelOrdersMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetFarmersOrderQuery,
  useDeliveredOrderMutation,
  useProcessingOrderMutation,
  useRejectOrderMutation,
  useGetPartnersOrderQuery,
  useShippedOrderMutation,
  useCompleteOrderMutation,
  useGetPartnerInfoByOrderIdQuery,
  useGetCustomerInfoByOrderIdQuery,
  useCreateEsewaOrderQuery
} = orderApi

export default orderApi;
