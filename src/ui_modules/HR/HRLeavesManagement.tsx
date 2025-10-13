import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Search, Filter } from "lucide-react";

export default function HRLeavesManagement() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const leaveData = [
    { id: 1, employee: "Sarah Johnson", type: "Annual Leave", from: "2024-10-15", to: "2024-10-20", days: 5, status: "approved", reason: "Family vacation" },
    { id: 2, employee: "Michael Chen", type: "Sick Leave", from: "2024-10-12", to: "2024-10-13", days: 2, status: "pending", reason: "Medical appointment" },
    { id: 3, employee: "Emma Williams", type: "Annual Leave", from: "2024-10-25", to: "2024-10-30", days: 5, status: "approved", reason: "Personal travel" },
    { id: 4, employee: "James Brown", type: "Sick Leave", from: "2024-10-10", to: "2024-10-10", days: 1, status: "rejected", reason: "Flu symptoms" },
    { id: 5, employee: "Lisa Anderson", type: "Maternity Leave", from: "2024-11-01", to: "2025-01-31", days: 90, status: "approved", reason: "Maternity" },
    { id: 6, employee: "David Martinez", type: "Annual Leave", from: "2024-10-18", to: "2024-10-22", days: 4, status: "pending", reason: "Wedding attendance" },
  ];

  const stats = [
    { label: "Total Requests", value: "24", change: "+3 this week" },
    { label: "Pending Approvals", value: "6", change: "Needs review" },
    { label: "Approved This Month", value: "18", change: "+25% vs last month" },
    { label: "Average Days", value: "4.2", change: "Per request" },
  ];

  const getStatusColor = (status:any) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLeaves = selectedFilter === "all" 
    ? leaveData 
    : leaveData.filter(leave => leave.status === selectedFilter);

  return (
    <div className="h-full p-6">
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold ">Employee Leaves</h1>
            <p className=" mt-1">Manage and track employee leave requests</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 ">
            <Plus className="w-4 h-4 mr-2" />
            New Leave Request
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm  font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold  mt-2">{stat.value}</p>
                  <p className="text-xs  mt-2">{stat.change}</p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "approved", "rejected"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "bg-blue-600" : ""}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Leave Requests Table */}
        <Card className=" border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className=" border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">From</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">To</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Days</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-teal-500 hover:text-gray-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                          {leave.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium ">{leave.employee}</p>
                          <p className="text-xs ">{leave.reason}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm ">{leave.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{leave.from}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{leave.to}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm ">
                        <Clock className="w-4 h-4 mr-1" />
                        {leave.days}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getStatusColor(leave.status)} border-0`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {leave.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                              Approve
                            </Button>
                            <Button size="sm" variant="secondary" className="text-xs">
                              Reject
                            </Button>
                          </>
                        )}
                        {leave.status !== "pending" && (
                          <Button size="sm" variant="secondary" className="text-xs">
                            View
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}