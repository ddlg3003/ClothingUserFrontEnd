import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../utils/globalVariables";

export const clothing = createApi({
  reducerPath: "clothing",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "product/getAll",
    }),
    getCategories: builder.query({
      query: () => "category/getAll",
    }),
    getCart: builder.query({
      query: () => "user/cart/getAll",
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetCartQuery } =
  clothing;
