

"use client"

import { store } from '@/lib/store'
import React from 'react'
import { Provider } from 'react-redux'
import { IChildren } from '@/types'


function ReduxProvider({children}:IChildren) {
  return (
    <div>
 
    <Provider store={store}>
        {children}
    </Provider>
    </div>
  )
}

export default ReduxProvider