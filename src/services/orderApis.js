import { clothing } from './clothingBaseApis';

const order = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `user/order/getAll`,
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation({
      query: (formData) => ({
        url: 'user/order/create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Cart', 'Order'],
    }),
    createVNPAYOrder: builder.mutation({
      query: (formData) => ({
        url: 'user/order/payment/vnpay',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useCreateVNPAYOrderMutation,
} = order;
