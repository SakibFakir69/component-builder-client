// hooks/useGetPayment.ts
import { useGetPaymentQuery } from '@/lib/api/baseApi';

export const useGetPayment = () => {
  const { data: getPayment, isLoading, error } = useGetPaymentQuery('');

  return { getPayment, isLoading, error };
};
