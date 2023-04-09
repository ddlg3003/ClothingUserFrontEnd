import { clothing } from './clothingBaseApis';
import { PYTHON_URL, LIMIT } from '../utils/globalVariables';

const product = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, cat, keyword, rating }) => {
        cat = cat ? cat : '';
        keyword = keyword ? keyword : '';
        rating = rating ? rating : '';

        return `product?keyword=${keyword}&pageNo=${page}&pageSize=${LIMIT}&catId=${cat}&rating=${rating}`;
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
      query: (userId) => `${PYTHON_URL}/recommend/${userId}`,
      providesTags: ['Wishlist'],
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
} = product;
