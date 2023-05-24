import { clothing, onQueryStartedHandler } from './clothingBaseApis';

const question = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getAnswer: builder.mutation({
      query: (formData) => ({
        url: `questions`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAnswerMutation } = question;
