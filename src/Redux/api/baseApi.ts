import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseAPi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api",
    baseUrl: "https://peracomerce.vercel.app/api",
    credentials: "include",
    // set token into heades as authorization name
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      // console.log("token", `Bearer ${token}`);
      if (token) {
        headers.set("authorization", `${token}`);
      }
      // console.log("headers", headers);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

// export const {} = baseApi;
