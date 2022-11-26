import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const cart = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => 'user/cart/getAll',
            providesTags: ['Cart'],
        }),
        increaseCartItem: builder.mutation({
            query: (formData) => ({
                url: 'user/cart/increase',
                method: 'POST',
                body: formData,
            }),
            providesTags: ['Cart'],
        }),
        decreaseCartItem: builder.mutation({
            query: (formData) => ({
                url: 'user/cart/decrease',
                method: 'POST',
                body: formData,
            }),
            providesTags: ['Cart'],
        }),
        deleteCartItem: builder.mutation({
            query: (formData) => ({
                url: 'user/cart/delete',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Cart'],
        }),
        addItemToCart: builder.mutation({
            query: (formData) => ({
                url: 'user/cart/add',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCartQuery,
    useIncreaseCartItemMutation,
    useDecreaseCartItemMutation,
    useDeleteCartItemMutation,
    useAddItemToCartMutation,
} = cart;
