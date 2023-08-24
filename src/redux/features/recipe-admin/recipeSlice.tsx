import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { deleteCookie, getCookie, setCookie } from "cookies-next";

type Authprops = { token: string | null; checkauth: boolean };
export type InitialStateProps = {
  loading: boolean;
  error: string | null;
  auth: Authprops;
};
// const JWT = getCookie("jwt");
const initialState = {
  auth: { token: null, checkauth: false },
  error: null,
  loading: false,
} as InitialStateProps;

export const Global: any = createSlice({
  name: "global",
  initialState,
  reducers: {
    ChangeState: (
      state: InitialStateProps,
      action: PayloadAction<InitialStateProps>
    ) => {
      state.loading = action?.payload?.loading;
      state.error = action?.payload?.error;
    },
    setAuth: (state: InitialStateProps, action: PayloadAction<Authprops>) => {
      // if (action?.payload?.token) {
      //   setCookie("jwt", action?.payload?.token, { maxAge: 60 * 60 * 24 });
      // }
      // state.auth = { ...state.auth, ...action?.payload };
    },
    Logout: (state: InitialStateProps, action: PayloadAction<Authprops>) => {
      // if (action?.payload?.token) {
      // }
      // deleteCookie("jwt");
      // state.auth = { token: null, checkauth: false };
    },
  },
});

export const { ChangeState, setAuth, Logout } = Global.actions;
export default Global.reducer;
