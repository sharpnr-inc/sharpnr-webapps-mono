import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, FileText, TrendingUp, AlertCircle } from "lucide-react";

export default function MyLeavesPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const leaveBalance = [
    { type: "Annual Leave", total: 20, used: 8, pending: 3, available: 9, color: "blue" },
    { type: "Sick Leave", total: 12, used: 2, pending: 0, available: 10, color: "green" },
    { type: "Personal Leave", total: 5, used: 1, pending: 0, available: 4, color: "purple" },
    { type: "Comp Off", total: 3, used: 0, pending: 0, available: 3, color: "orange" },
  ];

  const myLeaves = [
    { id: 1, type: "Annual Leave", from: "2024-10-25", to: "2024-10-30", days: 5, status: "approved", reason: "Family vacation", appliedOn: "2024-10-01" },
    { id: 2, type: "Sick Leave", from: "2024-10-12", to: "2024-10-13", days: 2, status: "pending", reason: "Medical appointment", appliedOn: "2024-10-11" },
    { id: 3, type: "Annual Leave", from: "2024-11-15", to: "2024-11-18", days: 4, status: "pending", reason: "Personal travel", appliedOn: "2024-10-10" },
    { id: 4, type: "Personal Leave", from: "2024-09-20", to: "2024-09-20", days: 1, status: "approved", reason: "Personal work", appliedOn: "2024-09-15" },
    { id: 5, type: "Sick Leave", from: "2024-08-05", to: "2024-08-06", days: 2, status: "approved", reason: "Fever", appliedOn: "2024-08-04" },
    { id: 6, type: "Annual Leave", from: "2024-12-23", to: "2024-12-27", days: 5, status: "pending", reason: "Holiday season", appliedOn: "2024-10-08" },
  ];

  const upcomingHolidays = [
    { date: "2024-10-24", name: "Diwali", day: "Thursday" },
    { date: "2024-11-15", name: "Guru Nanak Jayanti", day: "Friday" },
    { date: "2024-12-25", name: "Christmas", day: "Wednesday" },
  ];

  const getStatusColor = (status:any) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const colors = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
} as const; // ensures keys are literal types

const getColorClass = (color: keyof typeof colors) => {
  return colors[color] || "bg-gray-500";
};

  const filteredLeaves = selectedTab === "upcoming"
    ? myLeaves.filter(l => new Date(l.from) >= new Date() || l.status === "pending")
    : myLeaves.filter(l => new Date(l.to) < new Date() && l.status === "approved");

  return (
    <div className="h-full p-6 max-w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold ">My Leaves</h1>
            <p className=" mt-1">Manage your leave requests and view balance</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Apply for Leave
          </Button>
        </div>

        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveBalance.map((balance, index) => (
            <Card key={index} className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold ">{balance.type}</h3>
                  <div className={`w-10 h-10 ${getColorClass(balance.color  as keyof typeof colors)} rounded-lg flex items-center justify-center`}>
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold ">{balance.available}</p>
                  <p className="text-xs  mt-1">Available days</p>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="">Total: <span className="font-semibold">{balance.total}</span></span>
                  <span className="">Used: <span className="font-semibold">{balance.used}</span></span>
                  {balance.pending > 0 && (
                    <span className="text-yellow-600">Pending: <span className="font-semibold">{balance.pending}</span></span>
                  )}
                </div>
                <div className="w-full rounded-full h-2">
                  <div 
                    className={`${getColorClass(balance.color  as keyof typeof colors)} h-2 rounded-full transition-all`}
                    style={{ width: `${(balance.used / balance.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Leave Requests */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 border border-gray-200">
              <div className="flex gap-2 border-b border-gray-200 pb-4">
                <Button
                  variant={selectedTab === "upcoming" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab("upcoming")}
                  className={selectedTab === "upcoming" ? "bg-blue-600" : ""}
                >
                  Upcoming & Pending
                </Button>
                <Button
                  variant={selectedTab === "history" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab("history")}
                  className={selectedTab === "history" ? "bg-blue-600" : ""}
                >
                  Leave History
                </Button>
              </div>
            </Card>

            <div className="space-y-3">
              {filteredLeaves.map((leave) => (
                <Card key={leave.id} className="p-5 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`${getStatusColor(leave.status)} border-0`}>
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </Badge>
                        <span className="text-sm font-semibold">{leave.type}</span>
                      </div>
                      <p className=" mb-3">{leave.reason}</p>
                      <div className="flex flex-wrap gap-4 text-sm ">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{leave.from} to {leave.to}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{leave.days} {leave.days === 1 ? 'day' : 'days'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>Applied: {leave.appliedOn}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {leave.status === "pending" && (
                        <Button size="sm" variant="destructive" className=" border-red-600 hover:bg-red-50">
                          Cancel
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <Card className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Balance</h3>
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-4xl font-bold mb-2">26</p>
              <p className="text-blue-100 text-sm">Days available across all leave types</p>
            </Card>

            {/* Upcoming Holidays */}
            <Card className="p-5 bg-white border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Upcoming Holidays
              </h3>
              <div className="space-y-3">
                {upcomingHolidays.map((holiday, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{holiday.name}</p>
                      <p className="text-xs text-gray-600">{holiday.day}</p>
                    </div>
                    <p className="text-sm font-semibold text-blue-600">{holiday.date}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-5 bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Leave Policy</h4>
                  <p className="text-sm text-amber-800">Apply for leaves at least 3 days in advance. Sick leaves can be applied on the same day with proper documentation.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}