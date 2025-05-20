
import { Payment, formatCurrency, getStatusColor, getPaymentMethodIcon } from "@/lib/dummyData";

interface RecentPaymentsTableProps {
  payments: Payment[];
  limit?: number;
}

export function RecentPaymentsTable({ payments, limit = 5 }: RecentPaymentsTableProps) {
  // Limit the number of payments to display
  const displayPayments = payments.slice(0, limit);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 overflow-hidden">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Payments</h2>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receipt
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.receiptNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.studentName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">{getPaymentMethodIcon(payment.paymentMethod)}</span>
                    <span className="capitalize">{payment.paymentMethod}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
