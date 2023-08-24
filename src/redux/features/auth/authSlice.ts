import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

// const userToken = Cookies.get("accessToken") ?? null;
// const roles = Cookies.get("roles") ?? null;
const cookieUser =
  getCookie("user") ?? ('{"name": "Example", "age": 50}' as any);
const user = JSON.parse(cookieUser);
const username = user?.user ?? null;
const role = user?.role ?? null;
const userToken = user?.accessToken ?? null;
const authSlice = createSlice({
  name: "auth",
  // initialState: { user: null, token: null, roles:null },
  initialState: { user: username, token: userToken, role: role, PDFRecipe: undefined },
  reducers: {
    setCredentials: (state: any, action) => {
      const { user, accessToken, role } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.role = role;
      setCookie("loggedIn", "true");
      setCookie("user", JSON.stringify(action.payload));
    },
    setPDFRecipe: (state: any, action) => {
      // const { user, accessToken, role } = action.payload;
      state.PDFRecipe = action.payload;
    },
    logOut: (state: any) => {
      deleteCookie("loggedIn");
      deleteCookie("user");
      // localStorage.removeItem("watchlist"); // deletes token from storage
      // Cookies.remove("accessToken");
      // Cookies.remove("roles");
      // Cookies.remove("username");
      state.user = null;
      state.token = null;
      state.roles = [];
    },
  },
});

export const { setCredentials, logOut, setPDFRecipe } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;
// export const selectCurrentRoles = (state) => state.auth.roles;
