import { clothing, onQueryStartedHandler } from "./clothingBaseApis";

const comment = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByProductId: builder.query({
        query: (productId) =>
            `comment/product/${productId}`,
    }),
    addComment: builder.mutation({
      query: (formData) => ({
        url: "user/comment/create",
        method: "POST",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddCommentMutation, useGetCommentsByProductIdQuery } = comment;
