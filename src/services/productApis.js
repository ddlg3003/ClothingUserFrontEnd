import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, pageSize, cat, keyword }) => {
                if(!keyword) {
                    return `product?pageNo=${pageNumber}&pageSize=${pageSize}&catId=${cat}`;
                }

                return `product/search?keyword=${keyword}&pageNo=${pageNumber}&pageSize=${pageSize}`;
            }
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
