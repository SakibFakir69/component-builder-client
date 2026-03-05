'use client'

import LoadingStat from '@/components/admin/LoadingStat';
import PaymentCard, { IPaymentProps } from '@/components/admin/PaymentCard';
import { useGetAllPaymentQuery } from '@/lib/api/baseApi'


function  AdminPaymentViewPage() {


  const {data, isLoading} = useGetAllPaymentQuery(null);
  const paymentData = data?.data || [];

   if (isLoading) return <LoadingStat />;
   console.log(data?.data);




  return (
    <div>

      {
        paymentData?.map((payment:IPaymentProps, key:number)=>(<div key={key}>

          <PaymentCard  expiresAt={payment.expiresAt} planName={payment.planName} price={payment.price}/>
        </div>) 
        )
        
      }
        


    </div>
  )
}

export default AdminPaymentViewPage;