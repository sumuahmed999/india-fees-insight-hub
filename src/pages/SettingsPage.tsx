
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div>
      <DashboardHeader title="Settings" />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "general"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "fee"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("fee")}
          >
            Fee Structure
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "payment"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Methods
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "notifications"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
        </div>

        <div className="p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="institution-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Institution Name
                  </label>
                  <Input
                    id="institution-name"
                    defaultValue="ABC College of Engineering"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="academic-year"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Academic Year
                  </label>
                  <Input
                    id="academic-year"
                    defaultValue="2023-2024"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="accounts@abccollege.edu"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Number
                  </label>
                  <Input
                    id="phone"
                    defaultValue="+91 9876543210"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <Input
                  id="address"
                  defaultValue="123 Education Street, Knowledge Park, Chennai - 600001"
                  className="w-full"
                />
              </div>

              <div className="pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "fee" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Structure Settings</h3>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tuition Fee
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Development Fee
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Other Charges
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        B.Tech CSE
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        1st Year
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹75,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹15,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹10,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹1,00,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        B.Tech ECE
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        1st Year
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹70,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹12,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹8,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹90,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        MBA
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        1st Year
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹90,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹20,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹10,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹1,20,000
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add New Fee Structure
                </Button>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="text-lg">💻</span>
                      </div>
                      <h4 className="font-medium">Online Payment</h4>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 font-medium mr-2">Active</span>
                      <div className="w-10 h-5 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Accept payments via credit card, debit card, net banking, and other online methods.
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="text-lg">📱</span>
                      </div>
                      <h4 className="font-medium">UPI Payment</h4>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 font-medium mr-2">Active</span>
                      <div className="w-10 h-5 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Accept payments via UPI apps like Google Pay, PhonePe, Paytm, etc.
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="text-lg">🏦</span>
                      </div>
                      <h4 className="font-medium">Bank Transfer</h4>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 font-medium mr-2">Active</span>
                      <div className="w-10 h-5 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Accept payments via direct bank transfers and NEFT/RTGS.
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="text-lg">💵</span>
                      </div>
                      <h4 className="font-medium">Cash Payment</h4>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 font-medium mr-2">Active</span>
                      <div className="w-10 h-5 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Accept cash payments at the fee counter.
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="text-lg">📝</span>
                      </div>
                      <h4 className="font-medium">Check Payment</h4>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 font-medium mr-2">Active</span>
                      <div className="w-10 h-5 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Accept payments via checks and demand drafts.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Payment Reminders</h4>
                    <p className="text-sm text-gray-500">
                      Send reminders to students for upcoming fee payments.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium mr-2">Enabled</span>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Payment Receipts</h4>
                    <p className="text-sm text-gray-500">
                      Send email receipts for payments made by students.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium mr-2">Enabled</span>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Due Date Alerts</h4>
                    <p className="text-sm text-gray-500">
                      Send alerts when fee payment due dates are approaching.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium mr-2">Enabled</span>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Late Payment Notices</h4>
                    <p className="text-sm text-gray-500">
                      Send notices for overdue fee payments.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium mr-2">Enabled</span>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
