import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const comment = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByProductId: builder.query({
      query: (productId) => `comment/product/${productId}`,
      providesTags: ['Comment'],
    }),
    addComment: builder.mutation({
      query: (formData) => ({
        url: 'user/comment/create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
  overrideExisting: false,
});

export const { useAddCommentMutation, useGetCommentsByProductIdQuery } =
  comment;
