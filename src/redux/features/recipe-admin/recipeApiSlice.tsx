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
type Reset = {
  email: string;
  oldPassword: string;
  password: string;
};

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateRecipe: builder.mutation<any, any>({
      query: (payload: any) => ({
        url: "/api/recipe/create-recipe",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["admin-gteRecipes"],
    }),
    UpdateUser: builder.mutation<any, Reset>({
      query: (payload: Reset) => ({
        url: "/api/user/credentials",
        method: "PATCH",
        body: payload,
      }),
    }),
    UpdateRecipe: builder.mutation<any, { payload: Recipe; id: string }>({
      query: ({ payload, id }: { payload: Recipe; id: string }) => {
        console.log({ payload, id });
        return {
          url: `/api/recipe/update-recipe/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["admin-gteRecipes"],
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
    GetListedRecipes: builder.query<Recipe[], { cate: string; search: string }>(
      {
        query: ({ cate, search }) =>
          `/api/recipe/read-recipe?cat=${cate}&search=${search}`,
        providesTags: ["admin-gteRecipes"],
      }
    ),
    UpdateStatusRecipe: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/recipe/active-recipe/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["admin-gteRecipes"],
    }),
    DeleteRecipe: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/recipe/delete-recipe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin-gteRecipes"],
    }),
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
    // logout: builder.query({
    //   query: () => "/user/logout",
    //   // keepUnusedDataFor: 5,
    // }),
  }),
});

export const {
  useGetListedRecipesQuery,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
  useUpdateUserMutation,
  useUpdateRecipeMutation,
  useUpdateStatusRecipeMutation
} = adminApiSlice;
