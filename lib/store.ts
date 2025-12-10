import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice'
import { baseApi } from './api/baseApi'

export const store = configureStore({
  reducer: {
    counter: counterSlice,              
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
