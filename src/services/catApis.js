import { clothing } from './clothingBaseApis';

const cat = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'category/getAll',
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = cat;
