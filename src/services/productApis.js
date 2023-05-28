import { clothing } from './clothingBaseApis';
import {
  RECOMMEND_URL,
  LIMIT,
  SEARCH_BY_IMAGE_URL,
} from '../utils/globalVariables';
import { sortParamTransformer } from '../utils/helperFunction';

const product = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, cat, keyword, rating, sort_by: sortBy }) => {
        let endpoint = '';

        if (keyword) {
          endpoint = 'product/elastic-search';
        } else {
          endpoint = 'product';
        }

        cat = cat ? cat : '';
        keyword = keyword ? keyword : '';
        rating = rating ? rating : '';
        sortBy = sortParamTransformer(sortBy);

        return `${endpoint}?keyword=${keyword}&pageNo=${page}&pageSize=${LIMIT}&catId=${cat}&rating=${rating}&sortBy=${sortBy}`;
      },
    }),
    getProduct: builder.query({
      query: (id) => `product/${id}`,
    }),
    getProductsByCat: builder.query({
      query: (catId) => `product/category/${catId}`,
    }),
    getTypes: builder.query({
      query: (productId) => `type/product/${productId}`,
    }),
    getTypesProps: builder.query({
      query: (productId) => `type/cas/${productId}`,
    }),
    getProductsImages: builder.query({
      query: (productId) => `product/${productId}/imageDetail`,
    }),
    getRecommendedProducts: builder.query({
      query: (userId) => `${RECOMMEND_URL}/recommend/${userId}`,
      providesTags: ['Wishlist'],
    }),
    searchProductByImage: builder.mutation({
      query: (file) => ({
        url: `${SEARCH_BY_IMAGE_URL}/search-by-image`,
        method: 'POST',
        body: file,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCatQuery,
  useGetTypesQuery,
  useGetTypesPropsQuery,
  useGetProductsImagesQuery,
  useGetRecommendedProductsQuery,
  useSearchProductByImageMutation,
} = product;
