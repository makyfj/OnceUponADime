import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { RootState } from "../store"
import { User, AuthResponse, Login, Register } from "@/types/user"
import { API_URL } from "@/constants"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/user`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, Register>({
      query: ({ name, email, password }) => ({
        url: "",
        method: "POST",
        body: { name, email, password },
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const { useRegisterUserMutation } = userApi
