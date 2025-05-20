
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { FinancialSummary } from "@/lib/dummyData";

interface RevenueChartProps {
  data: FinancialSummary["monthlyCollection"];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Format the tooltips to show proper currency
  const formatTooltip = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(value) => `₹${(value / 1000)}K`}
            />
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{ 
                backgroundColor: "white", 
                borderRadius: "8px",
                border: "1px solid #e2e8f0"
              }}
              cursor={{ fill: 'rgba(236, 240, 243, 0.5)' }}
            />
            <Legend />
            <Bar 
              dataKey="amount" 
              name="Revenue" 
              fill="#2C74B3" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
