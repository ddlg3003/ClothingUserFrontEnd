import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const wishlist = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getUserWishlist: builder.query({
            query: () => `user/wishlist/getAll`,
            providesTags: ['Wishlist'],
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetUserWishlistQuery,
} = wishlist;
