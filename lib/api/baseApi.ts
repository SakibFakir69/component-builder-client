import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_BACKEND_URL,
    credentials: "include",
  }),

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

    // Get Me
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),


    // create prompt 
    createPrompt:builder.mutation({
        query:(data)=>({
            url:"/prompt/create-prompt",
            method:"POST",
            data:data
        })
    }),
    // prompt history 
    promptHistory:builder.query({
        query:()=>({
            url:"/prompt/prompt-history",
            method:"GET"
        })
    })

  }),
});

export const {
  useRegisterMutation,
  useLoginUserMutation,
  useGetMeQuery,
  usePromptHistoryQuery,
  useCreatePromptMutation
} = baseApi;
