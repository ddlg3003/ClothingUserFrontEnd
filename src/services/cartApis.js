import { clothing } from './clothingBaseApis';

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
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                  const { data: updatedCart } = await queryFulfilled;
                  dispatch(
                    clothing.util.updateQueryData('getCart', undefined, () => {
                        return updatedCart;
                    })
                  );
                } catch {}
            },
        }),
        decreaseCartItem: builder.mutation({
            query: (formData) => ({
                url: 'user/cart/decrease',
                method: 'POST',
                body: formData,
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                  const { data: updatedCart } = await queryFulfilled;
                  dispatch(
                    clothing.util.updateQueryData('getCart', undefined, () => {
                        return updatedCart;
                    })
                  );
                } catch {}
            },
        }),
        deleteCartItem: builder.mutation({
            query: (formData) => ({
                url: 'user/cart/delete',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Cart'],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                  const { data: updatedCart } = await queryFulfilled;
                  dispatch(
                    clothing.util.updateQueryData('getCart', undefined, () => {
                        return updatedCart;
                    })
                  );
                } catch {}
            },
        }),
        addItemToCart: builder.mutation({
            query: (formData) => ({
                url: 'user/cart/add',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Cart'],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                  const { data: updatedCart } = await queryFulfilled;
                  dispatch(
                    clothing.util.updateQueryData('getCart', undefined, () => {
                        return updatedCart;
                    })
                  );
                } catch {}
            },
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
