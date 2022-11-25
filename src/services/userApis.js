import { clothing } from './clothingBaseApis';

const user = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getUserAddress: builder.query({
            query: () => `user/address/getAll`,
        }),
        getProfile: builder.query({
            query: () => `user/profile`,
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetUserAddressQuery,
    useGetProfileQuery,
} = user;
