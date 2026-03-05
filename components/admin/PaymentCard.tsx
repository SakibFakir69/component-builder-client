import React from "react";
import { format } from 'date-and-time';


export interface IPaymentProps {
  expiresAt: string;

  planName: string;

  price: number | string;
}

function PaymentCard({expiresAt,planName,price}:IPaymentProps) {
    const date = format(new Date(expiresAt), 'ddd, MMM DD YYYY');

    // amar ai khana date aro valo vaba show korta hovba minit , + second use korta hobba 
    // + user somporka aro data use korta hobba
    

  return (
    <div>
      <h1>Payments</h1>
      {date}
      {planName}
      {price}

    </div>
  );
}

export default PaymentCard;
