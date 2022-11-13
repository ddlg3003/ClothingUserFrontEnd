import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../utils/globalVariables';

export const clothing = createApi({
    reducerPath: 'clothing',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'product/getAll'
        }),
        getCategories: builder.query({
            query: () => 'category/getAll'
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
} = clothing;