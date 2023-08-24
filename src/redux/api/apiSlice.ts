import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import defaultVariable from "@/config/default";
// import { setCredentials, logOut } from "../features/auth/authSlice";
// import { redirect } from "next/navigation";
// import { RedirectType } from "next/dist/client/components/redirect";
// import { getCookie } from "cookies-next";

// const local = "http://localhost:3456";
// const live = "https://recipe-bk-v1-1-1.vercel.app";
const URL = defaultVariable?.BackendURL;
const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }: { getState: any }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("result", result);
  // if (result?.error?.status === 401) {
  //   console.log("sending refresh token");
  //   // send refresh token to get new access token
  //   const refreshResult: any = await baseQuery(
  //     // "/api/user/refresh",
  //     { credentials: 'include', url: '/api/user/refresh' },
  //     api,
  //     extraOptions
  //   );
  //   console.log("refreshResult", refreshResult);
  //   if (refreshResult?.data) {
  //     // const user = api.getState().auth.user;
  //     // const roles = api.getState().auth.roles;
  //     // store the new token
  //     const cookieUser =
  //       getCookie("user") ?? ('{"name": "Example", "age": 50}' as any);
  //     const Cookieuser = JSON.parse(cookieUser);
  //     api.dispatch(
  //       setCredentials({
  //         accessToken: refreshResult.data.data.accessToken,
  //         user: Cookieuser.user,
  //         role: Cookieuser.role,
  //       })
  //     );
  //     // retry the original query with new access token
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //     redirect("login", RedirectType["push"]);
  //   }
  // }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["admin-gteRecipes"],
  endpoints: (builder) => ({}),
  // keepUnusedDataFor: 60000,
});
