import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DollarSign, 
  ShoppingBag, 
  Database, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MoreHorizontal,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Financial data for charts
const financialData = [
  { name: "Jan", revenue: 84000, expenses: 62000, profit: 22000 },
  { name: "Feb", revenue: 75000, expenses: 58000, profit: 17000 },
  { name: "Mar", revenue: 102000, expenses: 67000, profit: 35000 },
  { name: "Apr", revenue: 91500, expenses: 64500, profit: 27000 },
  { name: "May", revenue: 108000, expenses: 72000, profit: 36000 },
  { name: "Jun", revenue: 97500, expenses: 68500, profit: 29000 },
];

// Inventory data
const inventoryData = [
  { name: "Raw Materials", value: 35, color: "#0088FE" },
  { name: "Work in Progress", value: 25, color: "#00C49F" },
  { name: "Finished Goods", value: 40, color: "#FFBB28" },
];

// Recent orders
const recentOrdersData = [
  { id: "#ORD-1234", customer: "John Doe", date: "2025-06-19", total: "$125.99", status: "Completed" },
  { id: "#ORD-1235", customer: "Jane Smith", date: "2025-06-18", total: "$89.50", status: "Processing" },
  { id: "#ORD-1236", customer: "Robert Johnson", date: "2025-06-18", total: "$215.00", status: "Pending" },
  { id: "#ORD-1237", customer: "Emily Davis", date: "2025-06-17", total: "$54.75", status: "Completed" },
  { id: "#ORD-1238", customer: "Michael Brown", date: "2025-06-17", total: "$167.25", status: "Processing" },
];

// Project data
const projectsData = [
  { 
    name: "ERP System Implementation", 
    progress: 75, 
    status: "On Track", 
    deadline: "2025-08-15",
    team: ["JD", "MS", "AK", "BL"]
  },
  { 
    name: "Warehouse Expansion", 
    progress: 45, 
    status: "Delayed", 
    deadline: "2025-07-30",
    team: ["RJ", "TM"]
  },
  { 
    name: "Supply Chain Optimization", 
    progress: 90, 
    status: "On Track", 
    deadline: "2025-06-30",
    team: ["KP", "LW", "MJ"]
  },
  { 
    name: "New Product Launch", 
    progress: 60, 
    status: "At Risk", 
    deadline: "2025-09-01",
    team: ["SB", "AR", "CP", "DH"]
  },
];

// Tasks data
const tasksData = [
  { id: 1, title: "Review monthly financial reports", priority: "High", dueDate: "2025-06-20", status: "Pending" },
  { id: 2, title: "Inventory audit for Q2", priority: "Medium", dueDate: "2025-06-25", status: "In Progress" },
  { id: 3, title: "Meet with suppliers for price negotiation", priority: "High", dueDate: "2025-06-21", status: "Pending" },
];

export default function OverviewDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$542,870"
          description="+20.1% from last month"
          trend="up"
          icon={<DollarSign className="h-5 w-5 text-white" />}
          iconClass="bg-green-500"
        />
        <StatsCard
          title="Orders"
          value="2,345"
          description="+12.5% from last month"
          trend="up"
          icon={<ShoppingBag className="h-5 w-5 text-white" />}
          iconClass="bg-blue-500"
        />
        <StatsCard
          title="Inventory Value"
          value="$1.28M"
          description="+3.2% from last month"
          trend="up"
          icon={<Database className="h-5 w-5 text-white" />}
          iconClass="bg-purple-500"
        />
        <StatsCard
          title="Operating Costs"
          value="$285,410"
          description="-2.5% from last month"
          trend="down"
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          iconClass="bg-orange-500"
        />
      </div>

      {/* Revenue & Profit Chart */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Revenue, expenses and profit</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Weekly</Button>
            <Button variant="outline" size="sm">Monthly</Button>
            <Button size="sm">Quarterly</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financialData}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                <Bar dataKey="profit" name="Profit" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Mid Row: Projects & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Projects</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-6">
              {projectsData.map((project, idx) => (
                <div key={idx} className="px-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {project.deadline}
                        </span>
                        <Badge className={getStatusBadgeColor(project.status)}>{project.status}</Badge>
                      </div>
                    </div>
                    <div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.map((member, i) => (
                        <Avatar key={i} className="border-2 border-white h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">{member}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  {idx < projectsData.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks & Alerts */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tasks & Alerts</CardTitle>
              <Button variant="ghost" size="sm" className="text-sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {tasksData.map((task, idx) => (
                <div key={idx} className="px-4 py-2 rounded-lg hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${getTaskPriorityColor(task.priority)}`}></div>
                      <p className={`text-sm font-medium ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {task.dueDate}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <h3 className="px-4 text-sm font-medium mb-2">System Alerts</h3>
            <div className="space-y-3 px-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Low inventory alert</p>
                  <p className="text-xs text-yellow-700">3 products below reorder threshold</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Overdue payment</p>
                  <p className="text-xs text-red-700">Invoice #INV-2538 is 7 days overdue</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Inventory Summary & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Summary */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>Stock distribution by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center mt-4">
              {inventoryData.map((item, idx) => (
                <div key={idx} className="p-2 rounded-md" style={{ backgroundColor: `${item.color}20` }}>
                  <p className="text-lg font-bold">{item.value}%</p>
                  <p className="text-xs text-muted-foreground">{item.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" className="text-sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="py-3 px-4 text-left font-medium">Order ID</th>
                    <th className="py-3 px-4 text-left font-medium">Customer</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-left font-medium">Total</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrdersData.map((order, idx) => (
                    <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.customer}</td>
                      <td className="py-3 px-4 text-sm">{order.date}</td>
                      <td className="py-3 px-4 text-sm font-medium">{order.total}</td>
                      <td className="py-3 px-4 text-sm">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Stats card component for dashboard metrics
 */
function StatsCard({ title, value, description, trend, icon, iconClass }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${iconClass}`}>
            {icon}
          </div>
          {trend === "up" ? (
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {description.split(" ")[0]}
            </div>
          ) : (
            <div className="flex items-center text-red-600 text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              {description.split(" ")[0]}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-1 ${trend === "up" ? "bg-green-500" : "bg-red-500"}`} 
            style={{ width: `${trend === "up" ? "70%" : "30%"}` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Returns a Badge component styled based on order status
 */
function getStatusBadge(status) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    case "processing":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

/**
 * Returns a color class based on project status
 */
function getStatusBadgeColor(status) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "on track":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "at risk":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "delayed":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "completed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

/**
 * Returns a color class based on task priority
 */
function getTaskPriorityColor(priority) {
  const normalized = priority.toLowerCase();
  switch (normalized) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}