import { clothing } from './clothingBaseApis';

const order = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => `user/order/getAll`,
        }),
        createOrder: builder.mutation({
            query: (formData) => ({
                url: 'user/order/create',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllOrdersQuery, useCreateOrderMutation } = order;
