// import defaultVariable from "@/config/default";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import { getCookie } from "cookies-next";
// // import { Coin } from "../../models/Coin";
// const baseQuery = fetchBaseQuery({
//   baseUrl: defaultVariable?.BackendURL ?? "https://recipe-bk-v1-1-1.vercel.app",
//   // prepareHeaders: (headers, { getState }: { getState: any }) => {
//   //   const JWT = getCookie("jwt");
//   //   // const token = getState().global.auth.token;
//   //   console.log(JWT)
//   //   headers.set("authorization", `Bearer sddss`);
//   //   // if (JWT) {
//   //     // headers.set("Authorization", `Bearer ${JWT}`);
//   //   // }
//   //   console.log(headers)
//   //   return headers;
//   // },
//   prepareHeaders: (headers, { getState }) => {
//     // const JWT = getCookie("jwt");
//     // if (!headers.has("Authorization")) {
//     //   headers.set("Authorization", `Bearer ${JWT}`);
//     // }
//     return headers;
//   },
// });

// export const recipeApiSlice = createApi({
//   baseQuery,
//   tagTypes: ["recipe"],
//   endpoints: (builder) => ({
//     UserSigning: builder.mutation<any, LoginUser>({
//       query: (payload: LoginUser) => ({
//         url: "/api/user/signin",
//         method: "POST",
//         body: payload,
//       }),
//     }),
//     // UserRegister: builder.mutation<any, AuthForm>({
//     //   query: (payload: AuthForm) => ({
//     //     url: "/api/auth/signup",
//     //     method: "POST",
//     //     body: payload,
//     //   }),
//     // }),
// // GetRecipes: builder.query<{ user: Recipe }, {}>({
// GetRecipes: builder.query<Recipe[], {}>({
//   query: () => `/api/recipe/read-public-recipe`,
//   // keepUnusedDataFor: 0,
// }),
// GetRecipeByName: builder.query<Recipe, string>({
//   query: (recipeName) => `/api/recipe/read-single-recipe/${recipeName}`,
//   // keepUnusedDataFor: 0,
// }),
// GetRecipeCategory: builder.query<Recipe, {}>({
//   query: () => `/api/category/read-category`,
//   // keepUnusedDataFor: 0,
// }),
// GetSearchRecipe: builder.query<Recipe[], string>({
//   query: (search) => `/api/recipe/search-public-recipe?search=${search}`,
//   // keepUnusedDataFor: 0,
// }),
//   }),
// });

// export const {
//   useGetRecipesQuery,
//   useGetRecipeCategoryQuery,
//   useGetSearchRecipeQuery,
//   useGetRecipeByNameQuery,
//   useUserSigningMutation,
//   // useUserRegisterMutation,
//   // useGetLoginUserQuery,
// } = recipeApiSlice;

import { apiSlice } from "../../api/apiSlice";

export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    UserSigning: builder.mutation<any, LoginUser>({
      query: (payload: LoginUser) => ({
        url: "/api/user/signin",
        method: "POST",
        body: payload,
      }),
    }),
    // registeration: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/user/signup",
    //     method: "POST",
    //     body: { ...credentials },
    //   }),
    // }),
    // logout: builder.mutation({
    //   query: () => ({
    //     url: "/user/logout",
    //     method: "get",
    //   }),
    // }),
    // GetRecipes: builder.query<{ user: Recipe }, {}>({
    GetRecipes: builder.query<Recipe[], {}>({
      query: () => `/api/recipe/read-public-recipe`,
      // keepUnusedDataFor: 0,
    }),
    GetRecipeByName: builder.query<Recipe, string>({
      query: (recipeName) => `/api/recipe/read-single-recipe/${recipeName}`,
      // keepUnusedDataFor: 0,
    }),
    GetRecipeCategory: builder.query<Recipe, {}>({
      query: () => `/api/category/read-category`,
      // keepUnusedDataFor: 0,
    }),
    GetSearchRecipe: builder.query<Recipe[], string>({
      query: (search) => `/api/recipe/search-public-recipe?search=${search}`,
      // keepUnusedDataFor: 0,
    }),
    GetRecipesByCategory: builder.query<Recipe[], string>({
      query: (cat) => `/api/recipe/category-public-recipe?category=${cat}`,
      // keepUnusedDataFor: 0,
    }),
    // logout: builder.query({
    //   query: () => "/user/logout",
    //   // keepUnusedDataFor: 5,
    // }),
  }),
});

export const {
  useUserSigningMutation,
  useGetRecipeByNameQuery,
  useGetRecipeCategoryQuery,
  useGetRecipesQuery,
  useGetSearchRecipeQuery,
  useGetRecipesByCategoryQuery,
} = recipeApiSlice;
