import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const user = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getUserAddress: builder.query({
            query: () => `user/address/getAll`,
            providesTags: ['Address'],
        }),
        getProfile: builder.query({
            query: () => `user/profile`,
        }),
        addAddress: builder.mutation({
            query: (addressInfo) => ({
                url: 'user/address/create',
                method: 'POST',
                body: addressInfo,
            }),
            invalidatesTags: ['Address'],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                return onQueryStartedHandler(dispatch, queryFulfilled, 'getUserAddress');
            },
        }),
        updateAddress: builder.mutation({
            query: (addressInfo) => ({
                url: 'user/address/change',
                method: 'POST',
                body: addressInfo,
            }),
            invalidatesTags: ['Address'],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                return onQueryStartedHandler(dispatch, queryFulfilled, 'getUserAddress');
            },
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `user/address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                return onQueryStartedHandler(dispatch, queryFulfilled, 'getUserAddress');
            },
        }),
        changeProfile: builder.mutation({
            query: (formData) => ({
                url: 'user/profile/change',
                method: 'POST',
                body: formData,
            }),
        }),
        changePassword: builder.mutation({
            query: (formData) => ({
                url: 'user/changepassword',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetUserAddressQuery,
    useGetProfileQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useChangeProfileMutation,
    useChangePasswordMutation,
} = user;
