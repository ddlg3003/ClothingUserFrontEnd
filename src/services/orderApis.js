import { clothing } from './clothingBaseApis';

const order = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => `user/order/getAll`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllOrdersQuery } = order;
