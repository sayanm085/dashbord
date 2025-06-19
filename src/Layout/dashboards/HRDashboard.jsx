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
  Users, 
  UserPlus, 
  Calendar, 
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Building,
  Award,
  Briefcase,
  GraduationCap,
  HeartPulse,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  Clipboard
} from "lucide-react";
import {
  LineChart,
  Line,
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
  Legend,
  AreaChart

} from "recharts";

// HR stats
const hrStats = {
  totalEmployees: 124,
  newHires: 8,
  openPositions: 12,
  turnoverRate: "4.2%",
  trendEmployees: "+5.1%",
  trendHires: "+33.3%",
  trendPositions: "+9.1%",
  trendTurnover: "-0.8%"
};

// Departments distribution
const departmentsData = [
  { name: "Engineering", value: 42, color: "#4f46e5" },
  { name: "Sales", value: 28, color: "#0ea5e9" },
  { name: "Marketing", value: 18, color: "#22c55e" },
  { name: "Operations", value: 16, color: "#f59e0b" },
  { name: "Finance", value: 10, color: "#8b5cf6" },
  { name: "HR", value: 6, color: "#ec4899" },
  { name: "Other", value: 4, color: "#64748b" }
];

// Employees data
const employeesData = [
  { id: 1, name: "John Doe", avatar: "JD", position: "Senior Software Engineer", department: "Engineering", location: "New York", hireDate: "2022-05-12", status: "Active", email: "john.doe@example.com", phone: "+1 (555) 123-4567" },
  { id: 2, name: "Jane Smith", avatar: "JS", position: "Marketing Manager", department: "Marketing", location: "San Francisco", hireDate: "2021-03-18", status: "Active", email: "jane.smith@example.com", phone: "+1 (555) 987-6543" },
  { id: 3, name: "Michael Johnson", avatar: "MJ", position: "Sales Director", department: "Sales", location: "Chicago", hireDate: "2020-11-05", status: "Active", email: "michael.j@example.com", phone: "+1 (555) 456-7890" },
  { id: 4, name: "Sarah Williams", avatar: "SW", position: "HR Specialist", department: "HR", location: "New York", hireDate: "2023-01-10", status: "Active", email: "sarah.w@example.com", phone: "+1 (555) 234-5678" },
  { id: 5, name: "Robert Brown", avatar: "RB", position: "Financial Analyst", department: "Finance", location: "Boston", hireDate: "2022-09-22", status: "Active", email: "robert.b@example.com", phone: "+1 (555) 345-6789" },
  { id: 6, name: "Emily Davis", avatar: "ED", position: "Product Manager", department: "Engineering", location: "San Francisco", hireDate: "2021-07-14", status: "Active", email: "emily.d@example.com", phone: "+1 (555) 567-8901" },
  { id: 7, name: "David Wilson", avatar: "DW", position: "Operations Manager", department: "Operations", location: "Austin", hireDate: "2022-02-28", status: "On Leave", email: "david.w@example.com", phone: "+1 (555) 678-9012" },
  { id: 8, name: "Jennifer Taylor", avatar: "JT", position: "UI/UX Designer", department: "Engineering", location: "New York", hireDate: "2023-04-03", status: "Active", email: "jennifer.t@example.com", phone: "+1 (555) 789-0123" },
  { id: 9, name: "Thomas Anderson", avatar: "TA", position: "Systems Administrator", department: "Engineering", location: "Chicago", hireDate: "2022-08-11", status: "Active", email: "thomas.a@example.com", phone: "+1 (555) 890-1234" },
  { id: 10, name: "Lisa Martinez", avatar: "LM", position: "Account Executive", department: "Sales", location: "Miami", hireDate: "2023-02-15", status: "Active", email: "lisa.m@example.com", phone: "+1 (555) 901-2345" },
];

// Applicants data
const applicantsData = [
  { id: 1, name: "Alex Johnson", avatar: "AJ", position: "Frontend Developer", department: "Engineering", status: "Interview", appliedDate: "2025-06-10", source: "LinkedIn" },
  { id: 2, name: "Maria Garcia", avatar: "MG", position: "Sales Representative", department: "Sales", status: "Screening", appliedDate: "2025-06-12", source: "Indeed" },
  { id: 3, name: "Kevin Chen", avatar: "KC", position: "Product Manager", department: "Engineering", status: "Assessment", appliedDate: "2025-06-08", source: "Referral" },
  { id: 4, name: "Sophia Williams", avatar: "SW", position: "Marketing Specialist", department: "Marketing", status: "Offer", appliedDate: "2025-06-05", source: "Company Website" },
  { id: 5, name: "James Miller", avatar: "JM", position: "Financial Analyst", department: "Finance", status: "Rejected", appliedDate: "2025-06-11", source: "LinkedIn" },
  { id: 6, name: "Emma Davis", avatar: "ED", position: "HR Coordinator", department: "HR", status: "Interview", appliedDate: "2025-06-09", source: "Indeed" },
];

// Open positions
const openPositionsData = [
  { id: "POS-001", title: "Senior Backend Developer", department: "Engineering", location: "Remote", type: "Full-time", posted: "2025-06-01", applications: 24 },
  { id: "POS-002", title: "Marketing Coordinator", department: "Marketing", location: "New York", type: "Full-time", posted: "2025-06-05", applications: 18 },
  { id: "POS-003", title: "Sales Representative", department: "Sales", location: "Chicago", type: "Full-time", posted: "2025-06-08", applications: 12 },
  { id: "POS-004", title: "UX Designer", department: "Engineering", location: "San Francisco", type: "Full-time", posted: "2025-06-10", applications: 16 },
  { id: "POS-005", title: "Finance Manager", department: "Finance", location: "Boston", type: "Full-time", posted: "2025-06-12", applications: 8 },
  { id: "POS-006", title: "Operations Analyst", department: "Operations", location: "Remote", type: "Full-time", posted: "2025-06-15", applications: 14 },
  { id: "POS-007", title: "Customer Support Specialist", department: "Operations", location: "Austin", type: "Part-time", posted: "2025-06-16", applications: 22 },
];

// Attendance data (present day)
const attendanceData = [
  { id: 1, name: "John Doe", avatar: "JD", department: "Engineering", status: "Present", checkIn: "09:05", checkOut: "17:30", hours: "8:25" },
  { id: 2, name: "Jane Smith", avatar: "JS", department: "Marketing", status: "Present", checkIn: "08:55", checkOut: "18:05", hours: "9:10" },
  { id: 3, name: "Michael Johnson", avatar: "MJ", department: "Sales", status: "Present", checkIn: "09:10", checkOut: "17:45", hours: "8:35" },
  { id: 4, name: "Sarah Williams", avatar: "SW", department: "HR", status: "Present", checkIn: "08:50", checkOut: "17:15", hours: "8:25" },
  { id: 5, name: "Robert Brown", avatar: "RB", department: "Finance", status: "Present", checkIn: "09:02", checkOut: "18:10", hours: "9:08" },
  { id: 6, name: "Emily Davis", avatar: "ED", department: "Engineering", status: "Late", checkIn: "10:15", checkOut: "18:30", hours: "8:15" },
  { id: 7, name: "David Wilson", avatar: "DW", department: "Operations", status: "On Leave", checkIn: "-", checkOut: "-", hours: "-" },
  { id: 8, name: "Jennifer Taylor", avatar: "JT", department: "Engineering", status: "Present", checkIn: "09:00", checkOut: "17:55", hours: "8:55" },
  { id: 9, name: "Thomas Anderson", avatar: "TA", department: "Engineering", status: "Absent", checkIn: "-", checkOut: "-", hours: "-" },
  { id: 10, name: "Lisa Martinez", avatar: "LM", department: "Sales", status: "Present", checkIn: "08:58", checkOut: "17:50", hours: "8:52" },
];

// Leave requests
const leaveRequestsData = [
  { id: "LR-1001", employee: "David Wilson", avatar: "DW", type: "Sick Leave", from: "2025-06-19", to: "2025-06-20", days: 2, status: "Approved", approver: "Sarah Williams" },
  { id: "LR-1002", employee: "Jennifer Taylor", avatar: "JT", type: "Vacation", from: "2025-06-25", to: "2025-07-02", days: 8, status: "Pending", approver: "-" },
  { id: "LR-1003", employee: "Michael Johnson", avatar: "MJ", type: "Personal", from: "2025-07-05", to: "2025-07-05", days: 1, status: "Pending", approver: "-" },
  { id: "LR-1004", employee: "Emily Davis", avatar: "ED", type: "Vacation", from: "2025-07-15", to: "2025-07-25", days: 11, status: "Pending", approver: "-" },
  { id: "LR-1005", employee: "Thomas Anderson", avatar: "TA", type: "Sick Leave", from: "2025-06-19", to: "2025-06-19", days: 1, status: "Approved", approver: "Sarah Williams" },
];

// Payroll data
const payrollData = [
  { id: "PAY-2505", period: "May 2025", processedDate: "2025-05-30", status: "Completed", totalAmount: "$425,800", employees: 122 },
  { id: "PAY-2504", period: "April 2025", processedDate: "2025-04-30", status: "Completed", totalAmount: "$415,600", employees: 120 },
  { id: "PAY-2503", period: "March 2025", processedDate: "2025-03-30", status: "Completed", totalAmount: "$410,450", employees: 119 },
  { id: "PAY-2502", period: "February 2025", processedDate: "2025-02-28", status: "Completed", totalAmount: "$408,200", employees: 118 },
  { id: "PAY-2501", period: "January 2025", processedDate: "2025-01-30", status: "Completed", totalAmount: "$402,750", employees: 117 },
];

export default function HRDashboard() {
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser] = useState("sayanm085");
  const [currentDate] = useState("2025-06-19");

  // Filter employees based on department and search term
  const filteredEmployees = employeesData.filter(employee => {
    const matchesDept = employeeFilter === "all" || employee.department === employeeFilter;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={hrStats.totalEmployees.toString()}
          description={`${hrStats.trendEmployees} from last quarter`}
          trend="up"
          icon={<Users className="h-5 w-5 text-white" />}
          iconClass="bg-blue-500"
        />
        <StatsCard
          title="New Hires (MTD)"
          value={hrStats.newHires.toString()}
          description={`${hrStats.trendHires} from last month`}
          trend="up"
          icon={<UserPlus className="h-5 w-5 text-white" />}
          iconClass="bg-green-500"
        />
        <StatsCard
          title="Open Positions"
          value={hrStats.openPositions.toString()}
          description={`${hrStats.trendPositions} from last month`}
          trend="up"
          icon={<Briefcase className="h-5 w-5 text-white" />}
          iconClass="bg-purple-500"
        />
        <StatsCard
          title="Turnover Rate"
          value={hrStats.turnoverRate}
          description={`${hrStats.trendTurnover} from last quarter`}
          trend="down"
          icon={<Users className="h-5 w-5 text-white" />}
          iconClass="bg-red-500"
        />
      </div>

      {/* HR Tabs */}
      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Employee Directory</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search employees..."
                      className="w-full pl-8 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Employee</th>
                      <th className="py-3 px-4 text-left font-medium">Position</th>
                      <th className="py-3 px-4 text-left font-medium">Department</th>
                      <th className="py-3 px-4 text-left font-medium">Location</th>
                      <th className="py-3 px-4 text-left font-medium">Hire Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {employee.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{employee.name}</p>
                              <p className="text-xs text-muted-foreground">{employee.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{employee.position}</td>
                        <td className="py-3 px-4 text-sm">{employee.department}</td>
                        <td className="py-3 px-4 text-sm">{employee.location}</td>
                        <td className="py-3 px-4 text-sm">{employee.hireDate}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className={employee.status === "Active" ? 
                            "bg-green-100 text-green-800 hover:bg-green-100" : 
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}>
                            {employee.status}
                          </Badge>
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
                Showing {filteredEmployees.length} of {employeesData.length} employees
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Employees by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Employees']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest employee updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "2025-06-19", action: "David Wilson has taken sick leave", icon: <HeartPulse className="h-4 w-4 text-red-500" /> },
                    { date: "2025-06-18", action: "New hire: Lisa Martinez joined Sales", icon: <UserPlus className="h-4 w-4 text-green-500" /> },
                    { date: "2025-06-17", action: "Jennifer Taylor completed training", icon: <Award className="h-4 w-4 text-amber-500" /> },
                    { date: "2025-06-16", action: "Emily Davis promoted to Senior Product Manager", icon: <ArrowUpRight className="h-4 w-4 text-blue-500" /> },
                    { date: "2025-06-15", action: "Benefits enrollment open for Q3", icon: <FileText className="h-4 w-4 text-purple-500" /> },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1 bg-gray-100 rounded-full p-2">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recruitment Tab */}
        <TabsContent value="recruitment">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Open Positions</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="py-3 px-4 text-left font-medium">Position ID</th>
                        <th className="py-3 px-4 text-left font-medium">Title</th>
                        <th className="py-3 px-4 text-left font-medium">Department</th>
                        <th className="py-3 px-4 text-left font-medium">Location</th>
                        <th className="py-3 px-4 text-left font-medium">Type</th>
                        <th className="py-3 px-4 text-left font-medium">Posted Date</th>
                        <th className="py-3 px-4 text-left font-medium">Applications</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {openPositionsData.map((position, idx) => (
                        <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{position.id}</td>
                          <td className="py-3 px-4 text-sm font-medium">{position.title}</td>
                          <td className="py-3 px-4 text-sm">{position.department}</td>
                          <td className="py-3 px-4 text-sm">{position.location}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline">{position.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{position.posted}</td>
                          <td className="py-3 px-4 text-sm font-medium">{position.applications}</td>
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
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Hiring Progress</CardTitle>
                <CardDescription>Current recruitment pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Applied", count: 78, percentage: 100 },
                    { stage: "Screening", count: 42, percentage: 54 },
                    { stage: "Interview", count: 24, percentage: 31 },
                    { stage: "Assessment", count: 15, percentage: 19 },
                    { stage: "Offer", count: 8, percentage: 10 },
                    { stage: "Hired", count: 5, percentage: 6 },
                  ].map((stage, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>{stage.stage}</span>
                        <span>{stage.count} candidates</span>
                      </div>
                      <Progress value={stage.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm mt-6">
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>Latest job applications received</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Applicant</th>
                      <th className="py-3 px-4 text-left font-medium">Position</th>
                      <th className="py-3 px-4 text-left font-medium">Department</th>
                      <th className="py-3 px-4 text-left font-medium">Applied Date</th>
                      <th className="py-3 px-4 text-left font-medium">Source</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicantsData.map((applicant, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {applicant.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{applicant.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{applicant.position}</td>
                        <td className="py-3 px-4 text-sm">{applicant.department}</td>
                        <td className="py-3 px-4 text-sm">{applicant.appliedDate}</td>
                        <td className="py-3 px-4 text-sm">{applicant.source}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className={getApplicationStatusBadge(applicant.status)}>
                            {applicant.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">View CV</Button>
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
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Daily Attendance</CardTitle>
                    <CardDescription>Today: {currentDate}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="today">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="custom">Custom Date</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Calendar View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="py-3 px-4 text-left font-medium">Employee</th>
                        <th className="py-3 px-4 text-left font-medium">Department</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Check In</th>
                        <th className="py-3 px-4 text-left font-medium">Check Out</th>
                        <th className="py-3 px-4 text-left font-medium">Hours</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((record, idx) => (
                        <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {record.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <p className="text-sm font-medium">{record.name}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{record.department}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge className={getAttendanceStatusBadge(record.status)}>
                              {record.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{record.checkIn}</td>
                          <td className="py-3 px-4 text-sm">{record.checkOut}</td>
                          <td className="py-3 px-4 text-sm">{record.hours}</td>
                          <td className="py-3 px-4 text-sm">
                            <Button variant="outline" size="sm" className="h-8 px-2">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>Today's statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Present", value: 7, color: "#22c55e" },
                            { name: "Late", value: 1, color: "#eab308" },
                            { name: "Absent", value: 1, color: "#ef4444" },
                            { name: "On Leave", value: 1, color: "#64748b" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: "Present", value: 7, color: "#22c55e" },
                            { name: "Late", value: 1, color: "#eab308" },
                            { name: "Absent", value: 1, color: "#ef4444" },
                            { name: "On Leave", value: 1, color: "#64748b" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Employees']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">On Time</p>
                      <p className="text-2xl font-bold">70%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Avg. Hours</p>
                      <p className="text-2xl font-bold">8:42</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leave Requests</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Request ID</th>
                      <th className="py-3 px-4 text-left font-medium">Employee</th>
                      <th className="py-3 px-4 text-left font-medium">Leave Type</th>
                      <th className="py-3 px-4 text-left font-medium">From</th>
                      <th className="py-3 px-4 text-left font-medium">To</th>
                      <th className="py-3 px-4 text-left font-medium">Days</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequestsData.map((request, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{request.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {request.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm font-medium">{request.employee}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{request.type}</td>
                        <td className="py-3 px-4 text-sm">{request.from}</td>
                        <td className="py-3 px-4 text-sm">{request.to}</td>
                        <td className="py-3 px-4 text-sm">{request.days}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className={getLeaveStatusBadge(request.status)}>
                            {request.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            {request.status === "Pending" ? (
                              <>
                                <Button variant="outline" size="sm" className="h-8 px-2 bg-green-50 text-green-600 border-green-100 hover:bg-green-100 hover:text-green-700">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 px-2 bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:text-red-700">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                  <CardTitle>Current Payroll</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">June 2025 (Estimated)</p>
                  <p className="text-4xl font-bold">$432,650</p>
                  <p className="text-sm text-muted-foreground mt-1">124 employees</p>
                  <div className="flex justify-center mt-4">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Processing: 25% Complete
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle>Next Pay Date</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-4xl font-bold">Jun 30</p>
                  <p className="text-sm text-muted-foreground mt-1">11 days remaining</p>
                  <Progress value={58} className="h-2 mt-4" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Clipboard className="h-5 w-5 mr-2 text-purple-500" />
                  <CardTitle>Payroll Tasks</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <p className="text-sm">Verify time entries</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <p className="text-sm">Update tax tables</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <p className="text-sm">Process bonuses</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <p className="text-sm">Generate payslips</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm mt-6">
            <CardHeader>
              <CardTitle>Payroll History</CardTitle>
              <CardDescription>Previous payroll cycles</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Payroll ID</th>
                      <th className="py-3 px-4 text-left font-medium">Period</th>
                      <th className="py-3 px-4 text-left font-medium">Processing Date</th>
                      <th className="py-3 px-4 text-left font-medium">Employees</th>
                      <th className="py-3 px-4 text-left font-medium">Total Amount</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map((payroll, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{payroll.id}</td>
                        <td className="py-3 px-4 text-sm">{payroll.period}</td>
                        <td className="py-3 px-4 text-sm">{payroll.processedDate}</td>
                        <td className="py-3 px-4 text-sm">{payroll.employees}</td>
                        <td className="py-3 px-4 text-sm font-medium">{payroll.totalAmount}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {payroll.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Download className="h-3 w-3 mr-1" />
                              Export
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
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Headcount Trend</CardTitle>
                <CardDescription>Monthly employee count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: "Jan", employees: 117 },
                        { month: "Feb", employees: 118 },
                        { month: "Mar", employees: 119 },
                        { month: "Apr", employees: 120 },
                        { month: "May", employees: 122 },
                        { month: "Jun", employees: 124 }
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip formatter={(value) => [value, 'Employees']} />
                      <Area 
                        type="monotone" 
                        dataKey="employees" 
                        stroke="#4f46e5" 
                        fillOpacity={1} 
                        fill="url(#colorEmployees)" 
                        name="Headcount"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Employee Turnover</CardTitle>
                <CardDescription>Monthly hire vs separation rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", hireRate: 3.4, turnoverRate: 2.8 },
                        { month: "Feb", hireRate: 2.7, turnoverRate: 2.1 },
                        { month: "Mar", hireRate: 2.5, turnoverRate: 1.8 },
                        { month: "Apr", hireRate: 3.2, turnoverRate: 2.5 },
                        { month: "May", hireRate: 4.1, turnoverRate: 2.3 },
                        { month: "Jun", hireRate: 3.8, turnoverRate: 1.9 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="hireRate" name="Hire Rate" stroke="#22c55e" strokeWidth={2} />
                      <Line type="monotone" dataKey="turnoverRate" name="Turnover Rate" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Employee demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Male", value: 72, color: "#4f46e5" },
                          { name: "Female", value: 50, color: "#ec4899" },
                          { name: "Non-binary", value: 2, color: "#0ea5e9" }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "Male", value: 72, color: "#4f46e5" },
                          { name: "Female", value: 50, color: "#ec4899" },
                          { name: "Non-binary", value: 2, color: "#0ea5e9" }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Employees']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Productivity metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { department: "Engineering", productivity: 87, retention: 92 },
                        { department: "Sales", productivity: 92, retention: 84 },
                        { department: "Marketing", productivity: 89, retention: 90 },
                        { department: "Operations", productivity: 85, retention: 88 },
                        { department: "Finance", productivity: 91, retention: 95 },
                        { department: "HR", productivity: 94, retention: 97 }
                      ]}
                      margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="department" type="category" width={80} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                      <Bar dataKey="productivity" name="Productivity" fill="#4f46e5" />
                      <Bar dataKey="retention" name="Retention" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
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
 * Return appropriate badge color class based on application status
 */
function getApplicationStatusBadge(status) {
  switch (status) {
    case "Screening":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case "Interview":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Assessment":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    case "Offer":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Rejected":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

/**
 * Return appropriate badge color class based on attendance status
 */
function getAttendanceStatusBadge(status) {
  switch (status) {
    case "Present":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Late":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    case "Absent":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "On Leave":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

/**
 * Return appropriate badge color class based on leave status
 */
function getLeaveStatusBadge(status) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Pending":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    case "Rejected":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}