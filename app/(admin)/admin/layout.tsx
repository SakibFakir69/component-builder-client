

import { IChildren } from '@/types';
import React from 'react'

function AdminLayouts({children}:IChildren) {
  return (
    <div>

        {/* side bar */}

        {children}


    </div>
  )
}

export default AdminLayouts;