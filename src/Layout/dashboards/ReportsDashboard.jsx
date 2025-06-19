import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Download,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  FileText,
  Clock,
  Share2,
  Star,
  StarHalf,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Send,
  MoreHorizontal,
  Plus,
  ListFilter,
  ClipboardList,
  Printer,
  Globe,
  Layers,
  Settings
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "recharts";

// Current date and time data
const currentDateTime = "2025-06-19 13:12:42";
const currentUser = "sayanm085";

// Report performance stats
const reportStats = {
  reportsGenerated: 148,
  reportsViewed: 3245,
  totalSaved: 287,
  insights: 82,
  trendGenerated: "+12.5%",
  trendViewed: "+18.2%",
  trendSaved: "+7.3%",
  trendInsights: "+22.4%"
};

// Report data
const recentReportsData = [
  { id: "REP-1001", name: "Monthly Sales Summary", type: "Sales", format: "PDF", generated: "2025-06-18 10:15:22", size: "2.4 MB", status: "Completed", shared: 4 },
  { id: "REP-1002", name: "Q2 Financial Forecast", type: "Finance", format: "XLSX", generated: "2025-06-17 14:30:45", size: "3.1 MB", status: "Completed", shared: 8 },
  { id: "REP-1003", name: "Inventory Status Report", type: "Inventory", format: "PDF", generated: "2025-06-16 09:45:12", size: "1.8 MB", status: "Completed", shared: 3 },
  { id: "REP-1004", name: "Marketing Campaign Performance", type: "Marketing", format: "PPTX", generated: "2025-06-15 16:20:30", size: "5.2 MB", status: "Completed", shared: 12 },
  { id: "REP-1005", name: "Customer Satisfaction Survey", type: "Customer", format: "PDF", generated: "2025-06-15 11:10:05", size: "3.7 MB", status: "Completed", shared: 6 },
  { id: "REP-1006", name: "Supply Chain Analysis", type: "Operations", format: "PDF", generated: "2025-06-14 15:05:18", size: "4.2 MB", status: "Completed", shared: 5 },
  { id: "REP-1007", name: "Employee Productivity Report", type: "HR", format: "XLSX", generated: "2025-06-14 09:30:42", size: "2.1 MB", status: "Completed", shared: 7 },
  { id: "REP-1008", name: "IT Systems Uptime Review", type: "IT", format: "PDF", generated: "2025-06-13 14:15:33", size: "1.5 MB", status: "Completed", shared: 2 },
];

// Scheduled reports
const scheduledReportsData = [
  { id: "SCH-1001", name: "Weekly Sales Summary", type: "Sales", frequency: "Weekly", nextRun: "2025-06-22", recipients: 5, format: "PDF" },
  { id: "SCH-1002", name: "Monthly Financial Statement", type: "Finance", frequency: "Monthly", nextRun: "2025-07-01", recipients: 8, format: "XLSX" },
  { id: "SCH-1003", name: "Inventory Stock Levels", type: "Inventory", frequency: "Daily", nextRun: "2025-06-20", recipients: 3, format: "PDF" },
  { id: "SCH-1004", name: "Customer Acquisition Report", type: "Marketing", frequency: "Weekly", nextRun: "2025-06-23", recipients: 6, format: "PDF" },
  { id: "SCH-1005", name: "HR Attendance Summary", type: "HR", frequency: "Weekly", nextRun: "2025-06-22", recipients: 4, format: "XLSX" },
];

// Favorite reports
const favoriteReportsData = [
  { id: "FAV-1001", name: "Executive Dashboard", type: "Executive", lastViewed: "2025-06-18", format: "Dashboard" },
  { id: "FAV-1002", name: "Sales Performance", type: "Sales", lastViewed: "2025-06-17", format: "Dashboard" },
  { id: "FAV-1003", name: "Cash Flow Analysis", type: "Finance", lastViewed: "2025-06-16", format: "PDF" },
  { id: "FAV-1004", name: "Product Performance", type: "Sales", lastViewed: "2025-06-15", format: "Dashboard" },
  { id: "FAV-1005", name: "Marketing ROI", type: "Marketing", lastViewed: "2025-06-14", format: "XLSX" },
];

// Report templates
const reportTemplatesData = [
  { id: "TMPL-1001", name: "Sales Analysis", category: "Sales", rating: 4.8, downloads: 128, lastUpdated: "2025-05-15" },
  { id: "TMPL-1002", name: "Financial Statement", category: "Finance", rating: 4.9, downloads: 245, lastUpdated: "2025-05-10" },
  { id: "TMPL-1003", name: "Inventory Status", category: "Inventory", rating: 4.7, downloads: 112, lastUpdated: "2025-05-18" },
  { id: "TMPL-1004", name: "Marketing Campaign Performance", category: "Marketing", rating: 4.6, downloads: 98, lastUpdated: "2025-05-22" },
  { id: "TMPL-1005", name: "Employee Productivity", category: "HR", rating: 4.5, downloads: 87, lastUpdated: "2025-05-25" },
  { id: "TMPL-1006", name: "Customer Satisfaction", category: "Customer", rating: 4.7, downloads: 134, lastUpdated: "2025-05-12" },
  { id: "TMPL-1007", name: "Supply Chain Overview", category: "Operations", rating: 4.4, downloads: 76, lastUpdated: "2025-05-28" },
  { id: "TMPL-1008", name: "Project Status Report", category: "Project", rating: 4.8, downloads: 152, lastUpdated: "2025-05-05" },
];

// Sales trend data for charts
const salesTrendData = [
  { month: "Jan", revenue: 125000, target: 120000 },
  { month: "Feb", revenue: 118000, target: 122000 },
  { month: "Mar", revenue: 145000, target: 125000 },
  { month: "Apr", revenue: 132000, target: 130000 },
  { month: "May", revenue: 158000, target: 140000 },
  { month: "Jun", revenue: 152000, target: 145000 },
];

// Product performance data
const productPerformanceData = [
  { name: "Product A", sales: 4200, share: 32 },
  { name: "Product B", sales: 3800, share: 28 },
  { name: "Product C", sales: 2500, share: 19 },
  { name: "Product D", sales: 1800, share: 14 },
  { name: "Others", sales: 950, share: 7 },
];

// Regional sales data
const regionalSalesData = [
  { name: "North", value: 35, color: "#4f46e5" },
  { name: "South", value: 30, color: "#0ea5e9" },
  { name: "East", value: 20, color: "#22c55e" },
  { name: "West", value: 15, color: "#f59e0b" },
];

// Customer acquisition data
const customerAcquisitionData = [
  { month: "Jan", newCustomers: 245, returning: 420 },
  { month: "Feb", newCustomers: 285, returning: 435 },
  { month: "Mar", newCustomers: 310, returning: 455 },
  { month: "Apr", newCustomers: 340, returning: 480 },
  { month: "May", newCustomers: 375, returning: 510 },
  { month: "Jun", newCustomers: 400, returning: 530 },
];

export default function ReportsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportFilter, setReportFilter] = useState("all");
  const [timeframe, setTimeframe] = useState("ytd");

  // Filter reports based on search term and type
  const filteredReports = recentReportsData.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportFilter === "all" || report.type === reportFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Reports Generated"
          value={reportStats.reportsGenerated.toString()}
          description={`${reportStats.trendGenerated} from last month`}
          trend="up"
          icon={<FileText className="h-5 w-5 text-white" />}
          iconClass="bg-blue-500"
        />
        <StatsCard
          title="Reports Viewed"
          value={reportStats.reportsViewed.toString()}
          description={`${reportStats.trendViewed} from last month`}
          trend="up"
          icon={<Search className="h-5 w-5 text-white" />}
          iconClass="bg-green-500"
        />
        <StatsCard
          title="Saved Reports"
          value={reportStats.totalSaved.toString()}
          description={`${reportStats.trendSaved} from last month`}
          trend="up"
          icon={<Star className="h-5 w-5 text-white" />}
          iconClass="bg-amber-500"
        />
        <StatsCard
          title="Key Insights"
          value={reportStats.insights.toString()}
          description={`${reportStats.trendInsights} from last month`}
          trend="up"
          icon={<Zap className="h-5 w-5 text-white" />}
          iconClass="bg-purple-500"
        />
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="library">Report Library</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        {/* Report Library Tab */}
        <TabsContent value="library">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Recent Reports</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search reports..."
                      className="w-full pl-8 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={reportFilter} onValueChange={setReportFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Inventory">Inventory</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Report Name</th>
                      <th className="py-3 px-4 text-left font-medium">ID</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Format</th>
                      <th className="py-3 px-4 text-left font-medium">Generated</th>
                      <th className="py-3 px-4 text-left font-medium">Size</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{report.name}</td>
                        <td className="py-3 px-4 text-sm">{report.id}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="outline">{report.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{report.format}</td>
                        <td className="py-3 px-4 text-sm">{report.generated}</td>
                        <td className="py-3 px-4 text-sm">{report.size}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {report.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
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
                Showing {filteredReports.length} of {recentReportsData.length} reports
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Popular Reports</CardTitle>
                <CardDescription>Most viewed and downloaded</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Monthly Sales Summary", views: 187, downloads: 124, type: "Sales" },
                    { name: "Quarterly Financial Review", views: 165, downloads: 98, type: "Finance" },
                    { name: "Product Performance Analysis", views: 143, downloads: 87, type: "Sales" },
                    { name: "Customer Acquisition Report", views: 128, downloads: 76, type: "Marketing" },
                    { name: "Inventory Status Overview", views: 112, downloads: 65, type: "Inventory" },
                  ].map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.type}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs">
                          <Search className="h-3 w-3 text-gray-500" />
                          <span>{report.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Download className="h-3 w-3 text-gray-500" />
                          <span>{report.downloads}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Recently Viewed</CardTitle>
                <CardDescription>Your recent report activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Monthly Sales Summary", time: "Today, 11:32 AM", type: "Sales" },
                    { name: "Inventory Status Overview", time: "Today, 10:15 AM", type: "Inventory" },
                    { name: "Marketing Campaign Performance", time: "Yesterday, 4:45 PM", type: "Marketing" },
                    { name: "Customer Satisfaction Survey", time: "Yesterday, 2:30 PM", type: "Customer" },
                    { name: "Employee Productivity Report", time: "Jun 17, 9:20 AM", type: "HR" },
                  ].map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <p className="text-xs text-muted-foreground">{report.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.type}</Badge>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Revenue vs Target</CardDescription>
                </div>
                <Select defaultValue={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mtd">Month to Date</SelectItem>
                    <SelectItem value="qtd">Quarter to Date</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesTrendData}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#4f46e5" name="Revenue" strokeWidth={2} />
                      <Line type="monotone" dataKey="target" stroke="#22c55e" name="Target" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Top selling products</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart
                      data={productPerformanceData}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                      <Legend />
                      <Bar dataKey="sales" name="Sales" fill="#4f46e5" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Regional Sales</CardTitle>
                <CardDescription>Sales distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionalSalesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {regionalSalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New vs returning customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={customerAcquisitionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="newCustomers" 
                        stroke="#4f46e5" 
                        fillOpacity={1} 
                        fill="url(#colorNew)" 
                        name="New Customers"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="returning" 
                        stroke="#22c55e" 
                        fillOpacity={1} 
                        fill="url(#colorReturning)" 
                        name="Returning Customers"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Key Business Metrics</CardTitle>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Metric</th>
                      <th className="py-3 px-4 text-right font-medium">Current</th>
                      <th className="py-3 px-4 text-right font-medium">Previous</th>
                      <th className="py-3 px-4 text-right font-medium">Change</th>
                      <th className="py-3 px-4 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { metric: "Revenue", current: "$425,750", previous: "$385,420", change: "+10.5%", status: "positive" },
                      { metric: "Gross Profit", current: "$215,320", previous: "$187,650", change: "+14.7%", status: "positive" },
                      { metric: "Customer Acquisition Cost", current: "$85.42", previous: "$92.18", change: "-7.3%", status: "positive" },
                      { metric: "Average Order Value", current: "$128.35", previous: "$115.74", change: "+10.9%", status: "positive" },
                      { metric: "Inventory Turnover", current: "3.8", previous: "3.2", change: "+18.8%", status: "positive" },
                      { metric: "Customer Retention", current: "78.2%", previous: "76.5%", change: "+2.2%", status: "positive" },
                      { metric: "Employee Productivity", current: "$1,245", previous: "$1,180", change: "+5.5%", status: "positive" },
                      { metric: "Marketing ROI", current: "315%", previous: "285%", change: "+10.5%", status: "positive" },
                    ].map((metric, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{metric.metric}</td>
                        <td className="py-3 px-4 text-sm text-right">{metric.current}</td>
                        <td className="py-3 px-4 text-sm text-right">{metric.previous}</td>
                        <td className="py-3 px-4 text-sm text-right">
                          <span className={metric.status === "positive" ? "text-green-600" : "text-red-600"}>
                            {metric.change}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {metric.status === "positive" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              Good
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                              Alert
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scheduled Reports</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Report Name</th>
                      <th className="py-3 px-4 text-left font-medium">ID</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Frequency</th>
                      <th className="py-3 px-4 text-left font-medium">Next Run</th>
                      <th className="py-3 px-4 text-left font-medium">Format</th>
                      <th className="py-3 px-4 text-left font-medium">Recipients</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledReportsData.map((report, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{report.name}</td>
                        <td className="py-3 px-4 text-sm">{report.id}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="outline">{report.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{report.frequency}</td>
                        <td className="py-3 px-4 text-sm">{report.nextRun}</td>
                        <td className="py-3 px-4 text-sm">{report.format}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span>{report.recipients}</span>
                            <Users className="h-4 w-4 text-gray-500" />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">Edit</Button>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Send className="h-3 w-3 mr-1" />
                              Send Now
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Delivery Schedule</CardTitle>
                <CardDescription>Upcoming report deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { date: "2025-06-20", reports: [
                      { name: "Inventory Stock Levels", time: "08:00 AM", recipients: 3 }
                    ]},
                    { date: "2025-06-22", reports: [
                      { name: "Weekly Sales Summary", time: "07:00 AM", recipients: 5 },
                      { name: "HR Attendance Summary", time: "08:00 AM", recipients: 4 }
                    ]},
                    { date: "2025-06-23", reports: [
                      { name: "Customer Acquisition Report", time: "08:00 AM", recipients: 6 }
                    ]},
                    { date: "2025-07-01", reports: [
                      { name: "Monthly Financial Statement", time: "07:00 AM", recipients: 8 }
                    ]}
                  ].map((day, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">{day.date}</p>
                      </div>
                      <div className="ml-6 space-y-3">
                        {day.reports.map((report, rIdx) => (
                          <div key={rIdx} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div>
                              <p className="text-sm font-medium">{report.name}</p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-gray-500" />
                                  <p className="text-xs text-muted-foreground">{report.time}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3 text-gray-500" />
                                  <p className="text-xs text-muted-foreground">{report.recipients} recipients</p>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {reportTemplatesData.map((template, idx) => (
              <Card key={idx} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Star className="h-4 w-4 text-amber-400" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: Math.floor(template.rating) }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        {template.rating % 1 !== 0 && (
                          <StarHalf className="h-4 w-4 fill-current" />
                        )}
                      </div>
                      <span className="text-sm">{template.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Download className="h-4 w-4" />
                      <span>{template.downloads} downloads</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <RefreshCw className="h-4 w-4" />
                      <span>Updated {template.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use Template</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="shadow-sm mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Custom Templates</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Executive Dashboard", type: "Dashboard", created: "2025-05-10", lastUsed: "2025-06-15" },
                  { name: "Sales Performance Report", type: "PDF", created: "2025-05-15", lastUsed: "2025-06-10" },
                  { name: "Product Analysis", type: "XLSX", created: "2025-05-18", lastUsed: "2025-06-18" },
                  { name: "Custom Budget Review", type: "PDF", created: "2025-05-22", lastUsed: "2025-06-05" },
                  { name: "Marketing Campaign Tracker", type: "Dashboard", created: "2025-05-25", lastUsed: "2025-06-12" },
                  { name: "Inventory Management", type: "PDF", created: "2025-06-01", lastUsed: "2025-06-17" },
                ].map((template, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{template.name}</p>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Calendar className="h-3 w-3" />
                      <span>Created: {template.created}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Last used: {template.lastUsed}</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Favorite Reports</CardTitle>
              <CardDescription>Your saved and starred reports</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Report Name</th>
                      <th className="py-3 px-4 text-left font-medium">ID</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Format</th>
                      <th className="py-3 px-4 text-left font-medium">Last Viewed</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favoriteReportsData.map((report, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{report.name}</td>
                        <td className="py-3 px-4 text-sm">{report.id}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="outline">{report.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{report.format}</td>
                        <td className="py-3 px-4 text-sm">{report.lastViewed}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Star className="h-3 w-3 mr-1 fill-amber-400 text-amber-400" />
                              Unstar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Favorite Dashboards</CardTitle>
                <CardDescription>Your pinned interactive dashboards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Executive Overview", lastVisited: "Today, 09:45 AM" },
                    { name: "Sales Performance", lastVisited: "Yesterday, 2:30 PM" },
                    { name: "Marketing Campaign Tracker", lastVisited: "Jun 17, 11:20 AM" },
                    { name: "Financial KPIs", lastVisited: "Jun 15, 3:45 PM" },
                  ].map((dashboard, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b last:border-0 pb-3">
                      <div>
                        <p className="text-sm font-medium">{dashboard.name}</p>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <p className="text-xs text-muted-foreground">{dashboard.lastVisited}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used report actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <span>Generate Report</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
                    <Printer className="h-6 w-6 text-primary" />
                    <span>Print Report</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
                    <Download className="h-6 w-6 text-primary" />
                    <span>Download Data</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
                    <Share2 className="h-6 w-6 text-primary" />
                    <span>Share Report</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    <span>Publish</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    <span>Settings</span>
                  </Button>
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