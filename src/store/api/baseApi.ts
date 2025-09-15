// src/redux/hooks/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

const baseURL = import.meta.env.VITE_API_ENDPOINT;

if (!baseURL) {
  throw new Error("VITE_API_ENDPOINT is not defined in environment variables");
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include", // Changed from "omit" to "include"
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken || "";
    console.log({ token });
    if (token) {
      headers.set("Authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithErrorHandler: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  try {
    const result = await rawBaseQuery(args, api, extraOptions);

    return result;
  } catch (error) {
    console.error("API Error:", error);
    return {
      error: {
        status: "FETCH_ERROR",
        error: "Failed to fetch",
      },
    };
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: [
    "COMPANY_LOADS",
    "COMPANY_DRIVERS",
    "MESSAGE",
    "NOTIFICATION",
    "USER",
  ],
  endpoints: () => ({}),
});
