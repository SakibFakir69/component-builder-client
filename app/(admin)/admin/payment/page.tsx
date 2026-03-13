'use client'

import LoadingStat from '@/components/admin/LoadingStat';
import PaymentCard from '@/components/admin/PaymentCard';
import { useGetAllPaymentQuery } from '@/lib/api/baseApi'


function  AdminPaymentViewPage() {


  const {data, isLoading} = useGetAllPaymentQuery(null);
  const paymentData = data?.data || [];

   if (isLoading) return <LoadingStat />;
   console.log(data?.data);



  return (
    <div>

      <PaymentCard  paymentData={paymentData}/>
        


    </div>
  )
}

export default AdminPaymentViewPage;