
import { BadgeIndianRupee, Calendar, ChartBar, Users } from "lucide-react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { StatCard } from "@/components/Dashboard/StatCard";
import { RecentPaymentsTable } from "@/components/Dashboard/RecentPaymentsTable";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { financialSummary, payments, formatCurrency } from "@/lib/dummyData";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader title="Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Collection"
          value={formatCurrency(financialSummary.collectedFees)}
          icon={<BadgeIndianRupee className="h-6 w-6" />}
          description="Total fees collected"
          trend={{ value: 12, isPositive: true }}
          className="delay-75"
        />
        <StatCard
          title="Pending Fees"
          value={formatCurrency(financialSummary.pendingFees)}
          icon={<Calendar className="h-6 w-6" />}
          description="Amount pending collection"
          trend={{ value: 5, isPositive: false }}
          className="delay-150"
        />
        <StatCard
          title="Total Students"
          value={financialSummary.totalStudents}
          icon={<Users className="h-6 w-6" />}
          description={`${financialSummary.feesPaidStudents} students paid in full`}
          className="delay-200"
        />
        <StatCard
          title="Collection Rate"
          value={`${Math.round((financialSummary.collectedFees / (financialSummary.collectedFees + financialSummary.pendingFees)) * 100)}%`}
          icon={<ChartBar className="h-6 w-6" />}
          description="Of total fees collected"
          trend={{ value: 8, isPositive: true }}
          className="delay-300"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={financialSummary.monthlyCollection} />
        </div>
        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Students</span>
                <span className="font-medium">{financialSummary.totalStudents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fully Paid</span>
                <span className="font-medium">{financialSummary.feesPaidStudents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Payments</span>
                <span className="font-medium">{financialSummary.totalStudents - financialSummary.feesPaidStudents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overdue Amount</span>
                <span className="font-medium text-red-600">{formatCurrency(financialSummary.overdueAmount)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-lg p-6 text-white">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-blue-100 text-sm mb-4">View documentation or contact support for assistance with fee management.</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <RecentPaymentsTable payments={payments} />
      </div>
    </div>
  );
};

export default Dashboard;
