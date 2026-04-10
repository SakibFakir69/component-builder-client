'use client'

import HomePage from "@/components/home/HomePage"
import { usePathname } from "next/navigation"




function Page() {
  console.log("home comonent")

  const path = usePathname();
  console.log(path , 'path');
  
  const isAuthNow = path.startsWith('/auth');
  console.log(isAuthNow);

  return (
    <div>


      <HomePage/>
      




    </div>
  )
}

export default Page;