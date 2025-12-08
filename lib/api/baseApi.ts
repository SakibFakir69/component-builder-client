import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import build from "next/dist/build";




export const baseApi = createApi({

    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_BACKEND_URL,
        credentials:true,
    }),
    endpoints:(builder)=>({


        // register 
        /// login 

        register:builder.mutation({
            query:(data)=>({

                url:'/user/user/create-user',
                method:"POST",
                body:data



            })
        })



    })
})