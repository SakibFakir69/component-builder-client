import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_BACKEND_URL || "http://localhost:5000/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Prompt","User","Payment"],

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

 logoutUser: builder.mutation<void, void>({  // <ResultType, ArgType>
  query: () => ({
    url: "/auth/logout",
    method: "POST",
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

    // get all payment
    getAllPayment:builder.query({
      query:()=>({
        url:'/admin/payments',
        method:"GET"
      })

    }),
    // get single user payment details

    getSingleUserPaymentDetails:builder.query({
      query:({userId})=>({
        
        url:`/admin/users/payments/${userId}`,
        method:"GET"
      }),
      providesTags:['Payment']
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


   
   
  deleteHandelByAdmin: builder.mutation({
    query:(userId)=>({
      url:`/admin/users/${userId}`,
      method:"DELETE"

    }),
    invalidatesTags:['User']
  }),


  // ADMIN DASHBOARD
  adminDashboardInfo : builder.query({
    query:()=>({
      url:'/admin/dashboard',
      method:"GET"
    })
  }),

  // USER GRAPH API

  userGraph:builder.query({
    query:()=>({
      url:"/admin/users-graph",
      method:"GET"
    }),
    providesTags:['User']
  })
,

  // PAYMENT GRAPH 
  paymentGraph:builder.query({
    query:()=>({
      url:"/admin/payments-graph",
      method:"GET"

    }),
    providesTags:['User']
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
  useDeleteHandelByAdminMutation ,
   useGetSingleUserPaymentDetailsQuery,
   useGetAllPaymentQuery,
   useAdminDashboardInfoQuery,
   useUserGraphQuery,
   usePaymentGraphQuery
  
} = baseApi;
