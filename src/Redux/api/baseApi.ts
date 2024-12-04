import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseAPi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api",
    baseUrl: "https://car-rental-server5.vercel.app/api",
    credentials: "include",
    // set token into heades as authorization name
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      // console.log("token", `Bearer ${token}`);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      // console.log("headers", headers);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

// export const {} = baseApi;
