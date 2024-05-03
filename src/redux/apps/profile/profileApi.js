import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQuery} from "../baseQuery";


const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQuery,
  tagTypes: ['profile', 'getAdmins', 'allFarmers','allPartners', 'allDeliveryPartners'],
  endpoints: (builder)=> ({
    getUserProfile: builder.query({
      query: ()=> ({
        url: `/users/user/get-profile`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      transformResponse : (res) => res.data,
      providesTags: ['profile']
    }),
    getAllCustomers: builder.query({
      query: ()=> ({
        url: `/users/user/customers`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      transformResponse : (res) => res.data,
      providesTags: ['allCustomers']
    }),
    changeCustomerStatus: builder.mutation({
      query: (data) => ({
        url: `/users/user/${data?.id}/change-status`,
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['allCustomers']
    }),
    getAllPartners: builder.query({
      query: ()=> ({
        url: `/users/user/partners`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      transformResponse : (res) => res.data,
      providesTags: ['allPartners']
    }),
    changePartnerStatus: builder.mutation({
      query: (data) => ({
        url: `/users/user/${data?.id}/change-status`,
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['allPartners']
    }),
    // this is for checkout page only
    getAllDeliveryPartners: builder.query({
      query: () => ({
        url: `/users/partner-profile/delivery-partners`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      transformResponse: (res) => res.data,
      providesTags: ['allDeliveryPartners']
    }),
    getAllFarmers: builder.query({
      query: ()=> ({
        url: `/users/user/farmers`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      transformResponse : (res) => res.data,
      providesTags: ['allFarmers']
    }),
    changeFarmerStatus: builder.mutation({
      query: (data) => ({
        url: `/users/user/${data?.id}/change-status`,
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['allFarmers']
    }),
    getAllAdmin: builder.query({
      query: ()=> ({
        url: `/users/user/admin`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      transformResponse : (res) => res.data,
      providesTags: ['getAdmins']
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/users/user/create-admin`,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      invalidatesTags: ['getAdmins']
    }),
    updateUserProfile: builder.mutation({
      query: (data)=> ({
        url: `/users/user/update-profile`,
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }),
      invalidatesTags: ['profile']
    }),
    updateUserProfilePic: builder.mutation({
      query: (data)=> ({
        url: `/users/user/${data?.id}/update_profile_image`,
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      })
    }),
  }),
})

export const {
  useGetUserProfileQuery,
  useGetAllPartnersQuery,
  useGetAllFarmersQuery,
  useUpdateUserProfileMutation,
  useGetAllCustomersQuery,
  useGetAllDeliveryPartnersQuery,
  useGetAllAdminQuery,
  useCreateAdminMutation,
  useChangeFarmerStatusMutation,
  useChangePartnerStatusMutation,
  useChangeCustomerStatusMutation,
} = profileApi

export default profileApi
