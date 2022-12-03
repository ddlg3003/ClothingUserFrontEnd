import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const comment = clothing.injectEndpoints({
    endpoints: (builder) => ({
        // getCart: builder.query({
        //     query: () => 'user/cart/getAll',
        //     providesTags: ['Cart'],
        // }),
        addComment: builder.mutation({
            query: (formData) => ({
                url: 'user/comment/create',
                method: 'POST',
                body: formData,
            }),
            // invalidatesTags: ['Cart'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddCommentMutation,
} = comment;
