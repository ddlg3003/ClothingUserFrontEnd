import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, pageSize, cat }) =>
                `product?pageNo=${pageNumber}&pageSize=${pageSize}&catId=${cat}`,
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
} = product;
