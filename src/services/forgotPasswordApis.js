import { clothing } from './clothingBaseApis';

const forgotPassword = clothing.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: ({ email }) => ({
        url: 'recoveryPassword/getOtp',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: 'recoveryPassword/checkOtp',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendOtpMutation, useResetPasswordMutation } = forgotPassword;
