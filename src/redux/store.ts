// import { configureStore } from "@reduxjs/toolkit";
// import GlobalReducer from "@/redux/features/recipe-client/recipeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { recipeApiSlice } from "@/redux/features/recipe-client/recipeApiSlice";

// const store = configureStore({
//   reducer: {
//     [recipeApiSlice.reducerPath]: recipeApiSlice.reducer,
//     global: GlobalReducer,
//     // coin: coinReducer.reducer,
//     // two: twoSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(recipeApiSlice.middleware),
// });



import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
// import globalReducer from "../features/global/globalslice";
// import coinReducer from "../features/coin/coinSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    // global: globalReducer,
    // coin: coinReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;