import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../utils/globalVariables';

export const clothing = createApi({
    reducerPath: 'clothing',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'product/getAll',
        }),
        getProduct: builder.query({
            query: (id) => `product/${id}`,
        }),
        getCategories: builder.query({
            query: () => 'category/getAll',
        }),
        getCart: builder.query({
            query: () => 'user/cart/getAll',
        }),
        getTypes: builder.query({
            query: (productId) => `type/product/${productId}`,
        }),
        getTypesProps: builder.query({
            query: (productId) => `type/cas/${productId}`,
        }),
        getUserAddress: builder.query({
            query: () => `user/address/getAll`,
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductQuery,
    useGetCategoriesQuery, 
    useGetCartQuery, 
    useGetTypesQuery,
    useGetTypesPropsQuery,
    useGetUserAddressQuery,
} = clothing;
