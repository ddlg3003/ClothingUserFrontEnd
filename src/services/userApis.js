import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const user = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getUserAddress: builder.query({
      query: () => `user/address/getAll`,
      providesTags: ['Address'],
    }),
    getProfile: builder.query({
      query: () => `user/profile`,
      providesTags: ['User'],
    }),
    addAddress: builder.mutation({
      query: (addressInfo) => ({
        url: 'user/address/create',
        method: 'POST',
        body: addressInfo,
      }),
      invalidatesTags: ['Address'],
    }),
    updateAddress: builder.mutation({
      query: (addressInfo) => ({
        url: 'user/address/change',
        method: 'POST',
        body: addressInfo,
      }),
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `user/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
    selectDefaultAddress: builder.mutation({
      query: (id) => ({
        url: `user/address/setDefault/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Address'],
    }),
    changeProfile: builder.mutation({
      query: (formData) => ({
        url: 'user/profile/change',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (formData) => ({
        url: 'user/changepassword',
        method: 'POST',
        body: formData,
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (file) => ({
        url: 'user/profile/avatar',
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['User'],
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
  useSelectDefaultAddressMutation,
  useChangeProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
} = user;
