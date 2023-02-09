import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQuery from './serviceConfig';

export const clothing = createApi({
  reducerPath: 'clothing',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ['Cart', 'Address', 'Order', 'Wishlist', 'Comment', 'User', 'Type'],
  endpoints: () => ({}),
});

export const onQueryStartedHandler = async (
  dispatch,
  queryFulfilled,
  query,
) => {
  try {
    const { data } = await queryFulfilled;
    dispatch(
      clothing.util.updateQueryData(query, undefined, () => {
        return data;
      }),
    );
  } catch {}
};
