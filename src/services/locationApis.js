import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const location = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getAllProvince: builder.query({
      query: () => '/location/provinces',
      providesTags: ['Location'],
    }),
    
  }),
  overrideExisting: false,
});

export const {
    useGetAllProvinceQuery,
} = location;
