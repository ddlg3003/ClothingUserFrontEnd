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
    getCommentsByProductIdPagination: builder.query({
      query: ({ pageNo, pageSize, productId }) =>
        `comment?pageNo=${pageNo}&pageSize=${pageSize}&productId=${productId}`,
      invalidatesTags: ['Comment'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCommentMutation,
  useGetCommentsByProductIdQuery,
  useGetCommentsByProductIdPaginationQuery,
} = comment;
