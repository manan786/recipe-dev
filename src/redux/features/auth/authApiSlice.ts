import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    registeration: builder.mutation({
      query: (credentials) => ({
        url: "/user/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "get",
      }),
    }),
    // logout: builder.query({
    //   query: () => "/user/logout",
    //   // keepUnusedDataFor: 5,
    // }),
  }),
});

export const { useLoginMutation, useRegisterationMutation, useLogoutMutation } =
  authApiSlice;
