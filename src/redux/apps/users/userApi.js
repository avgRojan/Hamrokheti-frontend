import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { baseQueryForUserApi} from "../baseQuery";


const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryForUserApi,
  endpoints: (builder)=> ({
    getAllUsers: builder.query({
      query: ()=> ({
        url: `/users/user`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      transformResponse : (res) => res.data,
      providesTags: ['users']
    }),
    changeUserStatus: builder.mutation({
      query: (data) => ({
        url: `/users/user/${data?.id}/change-status`,
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['users']
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users/user`,
        method: 'POST',
        body: JSON.stringify(data)
      })
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/customauth/login`,
        method: 'POST',
        body: JSON.stringify(data)
      })
    }),

    validatedUser: builder.query({
      query: ()=> ({
        url: `/customauth/login`,
        method: 'GET'
      })
    })

  }),
})

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useValidatedUserQuery,
  useChangeUserStatusMutation,
} = userApi

export default userApi
