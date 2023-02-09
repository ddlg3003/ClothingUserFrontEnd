import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const wishlist = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getUserWishlist: builder.query({
      query: () => `user/wishlist/getAll`,
      providesTags: ['Wishlist'],
    }),
    toggleWishlist: builder.mutation({
      query: (proId) => ({
        url: `user/wishlist/toggle/${proId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserWishlistQuery, useToggleWishlistMutation } = wishlist;
