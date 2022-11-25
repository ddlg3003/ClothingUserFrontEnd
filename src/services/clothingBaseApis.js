import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQuery from './serviceConfig';

export const clothing = createApi({
    reducerPath: 'clothing',
    baseQuery: fetchBaseQuery(baseQuery),
    tagTypes: ['Cart', 'Address', 'Order'],
    endpoints: () => ({}),
});
