import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQuery} from "../baseQuery";

const contactApi = createApi({
  reducerPath: 'contacts',
  baseQuery: baseQuery,
  tagTypes: ['contacts'],
  endpoints: (builder) => ({
    getAllContacts:  builder.query({
      query: () => ({
        url: '/contacts/contact',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      transformResponse : (res) => res.data,
      providesTags: ['contacts']
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: '/contacts/contact/create',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['contacts']
    })
  }),
})

export const {
  useCreateContactMutation,
  useGetAllContactsQuery
} = contactApi

export default contactApi;
