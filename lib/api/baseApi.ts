import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_BACKEND_URL || "http://localhost:5000/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Prompt","User"],

  endpoints: (builder) => ({
    // Register user
    register: builder.mutation({
      query: (data) => ({
        url: "/user/user/create-user",
        method: "POST",
        body: data,
      }),
    }),

    // Login user
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login-user",
        method: "POST",
        body: data, // FIXED
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    // logout user

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: "",
      }),
    }),

    // create prompt
    generatePrompt: builder.mutation({
      query: (data) => ({
        url: "/prompt/create-prompt",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prompt"],
    }),

    promptHistory: builder.query({
      query: () => ({
        url: "/prompt/chat-history",
        method: "GET",
      }),
      providesTags: ["Prompt"],
    }),

    // get payment

    getPayment: builder.query({
      query: () => ({
        url: "/payment/get-payment",
        method: "GET",
      }),
    }),

    // user

    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        body: data,
      }),
    }),

    // get all user by admin api

    getAllUserByAdmin: builder.query({
      query: ({ search, lastId, limit }) => ({
        url: "/admin/users",
        method: "GET",
        params: {
          search,
          lastId,
          limit,
        },

      }),
      providesTags:['User']
    }),


    // 3/2/2026
    // delete user 
    // learning tag , provide tag , invalid tag 
  deleteHandelByAdmin: builder.mutation({
    query:(userId)=>({
      url:`/admin/users/${userId}`,
      method:"DELETE"

    }),
    invalidatesTags:['User']
  })
  

  }),
});

export const {
  useRegisterMutation,
  useLoginUserMutation,
  useGetMeQuery,
  usePromptHistoryQuery,
  useGeneratePromptMutation,
  useLogoutUserMutation,
  useGetPaymentQuery,
  useCreateUserMutation,
  useGetAllUserByAdminQuery,
  useDeleteHandelByAdminMutation
} = baseApi;
