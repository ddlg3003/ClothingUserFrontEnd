import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const location = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getAllProvince: builder.query({
      query: () => '/location/provinces',
    }),
    getDistrictByProvinceId: builder.query({
      query: (provinceId) => `/location/districts/${provinceId}`,
    }),
    getCommuneByDistrictId: builder.query({
      query: (districtId) => `/location/communes/${districtId}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useGetCommuneByDistrictIdQuery,
} = location;
