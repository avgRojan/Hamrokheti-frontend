import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('content-type', 'application/json');
    headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);

    return headers;
  },
});

export const baseQueryForUserApi = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('content-type', 'application/json');

    return headers;
  },
});
