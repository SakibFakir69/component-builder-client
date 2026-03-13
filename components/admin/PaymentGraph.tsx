import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { usePaymentGraphQuery } from '@/lib/api/baseApi';
import LoadingStat from '@/components/admin/LoadingStat';

function PaymentGraph() {
  const { data: userPaymentData, isLoading } = usePaymentGraphQuery(null);
  const rawData = userPaymentData?.data || [];

  // FIXED: Accessing year/month from the _id object
  const formattedData = rawData.map((item) => {
    const year = item._id?.year;
    const month = item._id?.month;

    let monthName = 'N/A';
    
    if (year && month) {
      // month - 1 because JavaScript months are 0-indexed (0 = Jan, 11 = Dec)
      const date = new Date(year, month - 1);
      if (!isNaN(date.getTime())) {
        monthName = date.toLocaleString('default', { month: 'short' });
      }
    }

    return {
      ...item,
      name: monthName,
      // Ensure totalPrice is a number just in case
      totalPrice: Number(item.totalPrice || 0),
    };
  });

  if (isLoading) return <LoadingStat />;

  return (
    <div className="w-full md:h-auto h-[450px] bg-[#1e293b] p-6 rounded-xl shadow-2xl border border-slate-700">
      <h3 className="text-lg font-semibold mb-8 text-white">Monthly Revenue</h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={formattedData} margin={{ top: 0, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#334155" 
          />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`}

          />
          
          <Tooltip 
            cursor={{ fill: '#334155', opacity: 0.4 }}
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #334155', 
              borderRadius: '8px',
              color: '#fff' 
            }}
            
            itemStyle={{ color: '#60a5fa' }}
            formatter={(value) => [`$${value}`, 'Revenue']}
          />

          <Bar 
            dataKey="totalPrice" 
            fill="#3b82f6" 
            radius={[6, 6, 0, 0]} 
            barSize={35}
          >
            {formattedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill="#60a5fa" 
                className="hover:fill-blue-400 transition-all duration-300 cursor-pointer" 
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PaymentGraph;