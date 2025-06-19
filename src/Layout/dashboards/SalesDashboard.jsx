import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MoreHorizontal,
  ShoppingCart,
  Filter,
  Search,
  TrendingUp,
  Map,
  Calendar,
  CreditCard,
  Package
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sales data for charts
const monthlySalesData = [
  { name: "Jan", sales: 21500, orders: 145 },
  { name: "Feb", sales: 19800, orders: 132 },
  { name: "Mar", sales: 25400, orders: 170 },
  { name: "Apr", sales: 23000, orders: 155 },
  { name: "May", sales: 28600, orders: 195 },
  { name: "Jun", sales: 26800, orders: 182 },
  { name: "Jul", sales: 30200, orders: 210 },
  { name: "Aug", sales: 34000, orders: 240 },
  { name: "Sep", sales: 31800, orders: 222 },
  { name: "Oct", sales: 37000, orders: 260 },
  { name: "Nov", sales: 34500, orders: 240 },
  { name: "Dec", sales: 41000, orders: 290 },
];

// Sales by category
const categoryData = [
  { name: "Electronics", value: 45, color: "#0088FE" },
  { name: "Clothing", value: 25, color: "#00C49F" },
  { name: "Home", value: 15, color: "#FFBB28" },
  { name: "Beauty", value: 10, color: "#FF8042" },
  { name: "Other", value: 5, color: "#8884d8" },
];

// Sales by region
const regionData = [
  { name: "North", value: 4500 },
  { name: "South", value: 5200 },
  { name: "East", value: 3800 },
  { name: "West", value: 6100 },
  { name: "Central", value: 2700 },
];

// Recent orders
const recentOrdersData = [
  { id: "#ORD-1234", customer: "John Doe", date: "2025-06-19", total: "$125.99", status: "Completed", items: 3, payment: "Credit Card" },
  { id: "#ORD-1235", customer: "Jane Smith", date: "2025-06-18", total: "$89.50", status: "Processing", items: 1, payment: "PayPal" },
  { id: "#ORD-1236", customer: "Robert Johnson", date: "2025-06-18", total: "$215.00", status: "Pending", items: 5, payment: "Bank Transfer" },
  { id: "#ORD-1237", customer: "Emily Davis", date: "2025-06-17", total: "$54.75", status: "Completed", items: 2, payment: "Credit Card" },
  { id: "#ORD-1238", customer: "Michael Brown", date: "2025-06-17", total: "$167.25", status: "Processing", items: 4, payment: "Credit Card" },
  { id: "#ORD-1239", customer: "Sarah Wilson", date: "2025-06-16", total: "$132.50", status: "Completed", items: 3, payment: "PayPal" },
  { id: "#ORD-1240", customer: "David Lee", date: "2025-06-16", total: "$78.99", status: "Cancelled", items: 2, payment: "Credit Card" },
  { id: "#ORD-1241", customer: "Amanda Walker", date: "2025-06-15", total: "$223.45", status: "Completed", items: 6, payment: "Bank Transfer" },
];

// Top customers
const topCustomersData = [
  { name: "Acme Corporation", avatar: "AC", orders: 156, spent: "$12,450", lastOrder: "2025-06-15" },
  { name: "Global Industries", avatar: "GI", orders: 132, spent: "$10,280", lastOrder: "2025-06-17" },
  { name: "Tech Solutions Inc", avatar: "TS", orders: 98, spent: "$8,740", lastOrder: "2025-06-18" },
  { name: "Northern Supplies", avatar: "NS", orders: 87, spent: "$7,320", lastOrder: "2025-06-16" },
  { name: "Metro Retailers", avatar: "MR", orders: 76, spent: "$6,540", lastOrder: "2025-06-14" },
];

// Payment methods distribution
const paymentMethodsData = [
  { name: "Credit Card", value: 65, color: "#4f46e5" },
  { name: "PayPal", value: 20, color: "#0ea5e9" },
  { name: "Bank Transfer", value: 10, color: "#22c55e" },
  { name: "Other", value: 5, color: "#64748b" },
];

export default function SalesDashboard() {
  const [orderFilter, setOrderFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on status and search term
  const filteredOrders = recentOrdersData.filter(order => {
    const matchesStatus = orderFilter === "all" || order.status.toLowerCase() === orderFilter.toLowerCase();
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Sales"
          value="$347,590"
          description="+14.5% from last month"
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
          title="Customers"
          value="8,942"
          description="+5.3% from last month"
          trend="up"
          icon={<Users className="h-5 w-5 text-white" />}
          iconClass="bg-purple-500"
        />
        <StatsCard
          title="Avg. Order Value"
          value="$148.22"
          description="+2.1% from last month"
          trend="up"
          icon={<ShoppingCart className="h-5 w-5 text-white" />}
          iconClass="bg-orange-500"
        />
      </div>

      {/* Sales Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full grid grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Sales Trend Chart */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales and order counts</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="year">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="halfyear">Last 6 Months</SelectItem>
                    <SelectItem value="year">Last 12 Months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlySalesData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" />
                    <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                    <Tooltip formatter={(value, name) => {
                      return name === 'sales' ? 
                        [`$${value.toLocaleString()}`, 'Sales'] : 
                        [value, 'Orders'];
                    }} />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="sales" 
                      name="Sales ($)" 
                      stroke="#4f46e5" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="orders" 
                      name="Orders" 
                      stroke="#ef4444" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Mid Row: Top Customers & Sales Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Customers */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Top Customers</CardTitle>
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topCustomersData.map((customer, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {customer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">Last order: {customer.lastOrder}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{customer.spent}</p>
                        <p className="text-xs text-muted-foreground">{customer.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales by Category */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Product category distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row: Regional Sales & Payment Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Sales */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Regional Sales</CardTitle>
                <CardDescription>Sales distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regionData}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                      <Bar dataKey="value" name="Sales" fill="#8884d8" radius={[4, 4, 0, 0]}>
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#8884d8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethodsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {paymentMethodsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center mt-4">
                  {paymentMethodsData.map((method, idx) => (
                    <div key={idx} className="p-2 rounded-md" style={{ backgroundColor: `${method.color}20` }}>
                      <p className="text-lg font-bold">{method.value}%</p>
                      <p className="text-xs text-muted-foreground">{method.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab Content */}
        <TabsContent value="orders" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Order Management</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search orders..."
                      className="w-full pl-8 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={orderFilter} onValueChange={setOrderFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
                </div>
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
                      <th className="py-3 px-4 text-left font-medium">Items</th>
                      <th className="py-3 px-4 text-left font-medium">Payment</th>
                      <th className="py-3 px-4 text-left font-medium">Total</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                        <td className="py-3 px-4 text-sm">{order.customer}</td>
                        <td className="py-3 px-4 text-sm">{order.date}</td>
                        <td className="py-3 px-4 text-sm">{order.items}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center">
                            <CreditCard className="h-3 w-3 mr-1" />
                            {order.payment}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">{order.total}</td>
                        <td className="py-3 px-4 text-sm">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {recentOrdersData.length} orders
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Customers Tab Content */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle>Total Customers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">8,942</p>
                  <p className="text-sm text-muted-foreground mt-1">+125 new this month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  <CardTitle>Retention Rate</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">76%</p>
                  <p className="text-sm text-muted-foreground mt-1">+2.3% from last month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-purple-500" />
                  <CardTitle>Average Orders</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">3.2</p>
                  <p className="text-sm text-muted-foreground mt-1">Orders per customer</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customer Directory</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search customers..."
                      className="w-full pl-8 bg-white"
                    />
                  </div>
                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Customer</th>
                      <th className="py-3 px-4 text-left font-medium">Email</th>
                      <th className="py-3 px-4 text-left font-medium">Orders</th>
                      <th className="py-3 px-4 text-left font-medium">Total Spent</th>
                      <th className="py-3 px-4 text-left font-medium">Last Order</th>
                      <th className="py-3 px-4 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "John Doe", email: "john.doe@example.com", avatar: "JD", orders: 8, spent: "$945.20", lastOrder: "2025-06-17" },
                      { name: "Jane Smith", email: "jane.smith@example.com", avatar: "JS", orders: 12, spent: "$1,245.75", lastOrder: "2025-06-19" },
                      { name: "Robert Johnson", email: "robert.j@example.com", avatar: "RJ", orders: 5, spent: "$682.50", lastOrder: "2025-06-15" },
                      { name: "Emily Davis", email: "emily.d@example.com", avatar: "ED", orders: 3, spent: "$328.40", lastOrder: "2025-06-18" },
                      { name: "Michael Brown", email: "michael.b@example.com", avatar: "MB", orders: 7, spent: "$785.30", lastOrder: "2025-06-16" },
                      { name: "Sarah Wilson", email: "sarah.w@example.com", avatar: "SW", orders: 10, spent: "$1,120.45", lastOrder: "2025-06-18" },
                      { name: "David Lee", email: "david.l@example.com", avatar: "DL", orders: 4, spent: "$492.75", lastOrder: "2025-06-14" },
                      { name: "Amanda Walker", email: "amanda.w@example.com", avatar: "AW", orders: 6, spent: "$873.20", lastOrder: "2025-06-16" },
                    ].map((customer, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {customer.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{customer.name}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{customer.email}</td>
                        <td className="py-3 px-4 text-sm">{customer.orders}</td>
                        <td className="py-3 px-4 text-sm font-medium">{customer.spent}</td>
                        <td className="py-3 px-4 text-sm">{customer.lastOrder}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">Profile</Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                Showing 8 of 942 customers
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Analytics Tab Content */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Sales Forecasting</CardTitle>
              <CardDescription>Projected revenue for the next 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { month: "Jul", actual: 0, forecast: 44000 },
                      { month: "Aug", actual: 0, forecast: 47500 },
                      { month: "Sep", actual: 0, forecast: 45000 },
                      { month: "Oct", actual: 0, forecast: 52000 },
                      { month: "Nov", actual: 0, forecast: 58000 },
                      { month: "Dec", actual: 0, forecast: 67000 }
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Forecast']} />
                    <Area 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorForecast)" 
                      name="Sales Forecast"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Products Performance</CardTitle>
                <CardDescription>Best and worst performing products</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-sm font-medium mb-3">Top Performing Products</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Smartphone XYZ", sales: 352, growth: "+28%", revenue: "$105,600" },
                      { name: "Wireless Headphones", sales: 273, growth: "+15%", revenue: "$32,760" },
                      { name: "Smart Watch Pro", sales: 189, growth: "+22%", revenue: "$47,250" },
                    ].map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-md bg-blue-100 flex items-center justify-center">
                            <Package className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{product.revenue}</p>
                          <p className="text-xs text-green-600">{product.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-6">
                  <h3 className="text-sm font-medium mb-3">Underperforming Products</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Basic Wired Mouse", sales: 45, growth: "-12%", revenue: "$1,350" },
                      { name: "Standard HDMI Cable", sales: 67, growth: "-8%", revenue: "$1,675" },
                      { name: "Basic Phone Case", sales: 89, growth: "-5%", revenue: "$1,780" },
                    ].map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-md bg-red-100 flex items-center justify-center">
                            <Package className="h-5 w-5 text-red-700" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{product.revenue}</p>
                          <p className="text-xs text-red-600">{product.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Sales Channels</CardTitle>
                <CardDescription>Distribution by sales channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Website", sales: 145000 },
                        { name: "Mobile App", sales: 87500 },
                        { name: "Marketplaces", sales: 65000 },
                        { name: "Retail", sales: 50000 }
                      ]}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                      <Legend />
                      <Bar dataKey="sales" name="Sales Revenue" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center mt-4">
                  {[
                    { name: "Website", value: "$145,000", percent: "42%" },
                    { name: "Mobile App", value: "$87,500", percent: "25%" },
                    { name: "Marketplaces", value: "$65,000", percent: "19%" },
                    { name: "Retail", value: "$50,000", percent: "14%" },
                  ].map((channel, idx) => (
                    <div key={idx} className="p-2 rounded-md bg-gray-50">
                      <p className="text-lg font-bold">{channel.percent}</p>
                      <p className="text-sm font-medium">{channel.value}</p>
                      <p className="text-xs text-muted-foreground">{channel.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
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