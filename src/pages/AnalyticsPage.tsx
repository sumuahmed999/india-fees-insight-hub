
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { financialSummary, formatCurrency } from "@/lib/dummyData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AnalyticsPage = () => {
  // Prepare data for the pie chart
  const courseData = financialSummary.courseDistribution.map((course) => ({
    name: course.course,
    value: course.students,
  }));

  const feesData = financialSummary.courseDistribution.map((course) => ({
    name: course.course,
    value: course.collected,
  }));

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#83A6ED"];

  // Format tooltips to show proper currency
  const formatTooltip = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div>
      <DashboardHeader title="Analytics" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Students by Course</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fees Collection by Course</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {feesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Collection Trend</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={financialSummary.monthlyCollection}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar
                dataKey="amount"
                name="Collection Amount"
                fill="#2C74B3"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Fee Distribution</h3>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Fees
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collected
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {financialSummary.courseDistribution.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.course}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.students}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(course.totalFees)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {formatCurrency(course.collected)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.totalFees > 0
                        ? `${Math.round((course.collected / course.totalFees) * 100)}%`
                        : "0%"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Statistics</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Collection Ratio</h4>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${
                          (financialSummary.collectedFees /
                            (financialSummary.collectedFees + financialSummary.pendingFees)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">{`${Math.round(
                  (financialSummary.collectedFees /
                    (financialSummary.collectedFees + financialSummary.pendingFees)) *
                    100
                )}%`}</span>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Collected: {formatCurrency(financialSummary.collectedFees)}</span>
                <span>Total: {formatCurrency(financialSummary.collectedFees + financialSummary.pendingFees)}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Student Payment Status</h4>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{
                        width: `${(financialSummary.feesPaidStudents / financialSummary.totalStudents) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">{`${Math.round(
                  (financialSummary.feesPaidStudents / financialSummary.totalStudents) * 100
                )}%`}</span>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Paid Students: {financialSummary.feesPaidStudents}</span>
                <span>Total Students: {financialSummary.totalStudents}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Fee Default Rate</h4>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full"
                      style={{
                        width: `${
                          (financialSummary.overdueAmount /
                            (financialSummary.collectedFees + financialSummary.pendingFees)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">{`${Math.round(
                  (financialSummary.overdueAmount /
                    (financialSummary.collectedFees + financialSummary.pendingFees)) *
                    100
                )}%`}</span>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Overdue: {formatCurrency(financialSummary.overdueAmount)}</span>
                <span>Total: {formatCurrency(financialSummary.collectedFees + financialSummary.pendingFees)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
