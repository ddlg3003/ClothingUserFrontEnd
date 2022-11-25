import { clothing } from './clothingBaseApis';

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
                try {
                  const { data: updatedAddress } = await queryFulfilled;
                  dispatch(
                    clothing.util.updateQueryData('getUserAddress', undefined, () => {
                        return updatedAddress;
                    })
                  );
                } catch {}
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
                try {
                  const { data: updatedAddress } = await queryFulfilled;
                  dispatch(
                    clothing.util.updateQueryData('getUserAddress', undefined, () => {
                        return updatedAddress;
                    })
                  );
                } catch {}
            },
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `user/address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                  const { data: updatedAddress } = await queryFulfilled;
                  dispatch(
                    clothing.util.updateQueryData('getUserAddress', undefined, () => {
                        return updatedAddress;
                    })
                  );
                } catch {}
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
