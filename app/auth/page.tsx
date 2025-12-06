

import React from 'react'

interface MyChildren{
    children:React.ReactNode
}

function page({children}:MyChildren) {
  return (
    <div className=''>
        <h1>Auth page</h1>
        {children}


    </div>
  )
}

export default page