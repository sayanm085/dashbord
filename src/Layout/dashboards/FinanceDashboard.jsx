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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MoreHorizontal,
  CreditCard,
  Layers,
  Filter,
  Search,
  Calendar,
  PieChart,
  BarChart,
  ArrowUp,
  ArrowDown,
  Download,
  AlertCircle,
  Plus,
  Clock,
  CheckCircle,
  Archive,
  RefreshCw
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Finance stats
const financeStats = {
  revenue: "$1.25M",
  expenses: "$745,410",
  profit: "$504,590",
  cashFlow: "$125,240",
  trendRevenue: "+15.3%",
  trendExpenses: "+8.1%",
  trendProfit: "+22.5%",
  trendCashFlow: "-3.5%"
};

// Financial data for charts
const monthlyFinanceData = [
  { month: "Jan", revenue: 84000, expenses: 62000, profit: 22000 },
  { month: "Feb", revenue: 75000, expenses: 58000, profit: 17000 },
  { month: "Mar", revenue: 102000, expenses: 67000, profit: 35000 },
  { month: "Apr", revenue: 91500, expenses: 64500, profit: 27000 },
  { month: "May", revenue: 108000, expenses: 72000, profit: 36000 },
  { month: "Jun", revenue: 97500, expenses: 68500, profit: 29000 },
];

// Expense categories
const expenseCategoriesData = [
  { name: "Payroll", value: 45, color: "#0088FE" },
  { name: "Materials", value: 25, color: "#00C49F" },
  { name: "Operations", value: 15, color: "#FFBB28" },
  { name: "Marketing", value: 10, color: "#FF8042" },
  { name: "Other", value: 5, color: "#8884d8" },
];

// Accounts receivable
const accountsReceivableData = [
  { id: "INV-1001", customer: "Acme Corp", amount: "$5,250", date: "2025-06-25", status: "Pending", daysOverdue: 0 },
  { id: "INV-1002", customer: "XYZ Inc", amount: "$3,740", date: "2025-06-22", status: "Overdue", daysOverdue: 5 },
  { id: "INV-1003", customer: "Global Tech", amount: "$8,120", date: "2025-06-30", status: "Pending", daysOverdue: 0 },
  { id: "INV-1004", customer: "ABC Solutions", amount: "$2,350", date: "2025-06-19", status: "Overdue", daysOverdue: 8 },
  { id: "INV-1005", customer: "Metro Industries", amount: "$6,720", date: "2025-06-27", status: "Pending", daysOverdue: 0 },
];

// Accounts payable
const accountsPayableData = [
  { id: "AP-1001", supplier: "Raw Materials Co", amount: "$12,450", date: "2025-06-21", status: "Scheduled", daysUntilDue: 2 },
  { id: "AP-1002", supplier: "Parts & Services", amount: "$4,320", date: "2025-06-24", status: "Pending", daysUntilDue: 5 },
  { id: "AP-1003", supplier: "Shipping Partners", amount: "$2,780", date: "2025-06-18", status: "Overdue", daysUntilDue: -1 },
  { id: "AP-1004", supplier: "Equipment Rental", amount: "$6,540", date: "2025-06-29", status: "Scheduled", daysUntilDue: 10 },
  { id: "AP-1005", supplier: "Office Supplies", amount: "$1,850", date: "2025-06-22", status: "Pending", daysUntilDue: 3 },
];

// Profit & Loss data
const profitLossData = [
  { 
    category: "Revenue", 
    current: 1250000, 
    previous: 980000, 
    change: 27.6,
    items: [
      { name: "Product Sales", current: 980000, previous: 780000, change: 25.6 },
      { name: "Services", current: 210000, previous: 150000, change: 40.0 },
      { name: "Other Income", current: 60000, previous: 50000, change: 20.0 }
    ] 
  },
  { 
    category: "Cost of Goods Sold", 
    current: 520000, 
    previous: 420000, 
    change: 23.8,
    items: [
      { name: "Materials", current: 380000, previous: 310000, change: 22.6 },
      { name: "Labor", current: 140000, previous: 110000, change: 27.3 }
    ] 
  },
  { 
    category: "Gross Profit", 
    current: 730000, 
    previous: 560000, 
    change: 30.4,
    isTotal: true
  },
  { 
    category: "Operating Expenses", 
    current: 225410, 
    previous: 195000, 
    change: 15.6,
    items: [
      { name: "Payroll", current: 120000, previous: 105000, change: 14.3 },
      { name: "Marketing", current: 45000, previous: 40000, change: 12.5 },
      { name: "Rent", current: 32000, previous: 28000, change: 14.3 },
      { name: "Utilities", current: 18410, previous: 15000, change: 22.7 },
      { name: "Other", current: 10000, previous: 7000, change: 42.9 }
    ] 
  },
  { 
    category: "Net Profit", 
    current: 504590, 
    previous: 365000, 
    change: 38.2,
    isTotal: true
  }
];

// Cash flow data
const cashFlowData = [
  { 
    category: "Operating Activities",
    amount: 258500,
    direction: "inflow",
    items: [
      { name: "Net Income", amount: 504590 },
      { name: "Depreciation", amount: 45000 },
      { name: "Accounts Receivable", amount: -185000 },
      { name: "Inventory", amount: -128000 },
      { name: "Accounts Payable", amount: 21910 }
    ]
  },
  { 
    category: "Investing Activities",
    amount: -175000,
    direction: "outflow",
    items: [
      { name: "Purchase of Equipment", amount: -145000 },
      { name: "Purchase of Investments", amount: -30000 }
    ]
  },
  { 
    category: "Financing Activities",
    amount: 41740,
    direction: "inflow",
    items: [
      { name: "Loan Proceeds", amount: 75000 },
      { name: "Loan Repayment", amount: -25000 },
      { name: "Dividend Payments", amount: -8260 }
    ]
  },
  { 
    category: "Net Cash Flow",
    amount: 125240,
    direction: "inflow",
    isTotal: true
  }
];

// Recent transactions
const recentTransactionsData = [
  { id: "TRX-1001", date: "2025-06-19", description: "Customer Payment - ABC Solutions", type: "Income", amount: "$4,250.00", status: "Completed" },
  { id: "TRX-1002", date: "2025-06-18", description: "Supplier Payment - Raw Materials Co", type: "Expense", amount: "$8,750.50", status: "Completed" },
  { id: "TRX-1003", date: "2025-06-18", description: "Employee Payroll", type: "Expense", amount: "$34,560.25", status: "Completed" },
  { id: "TRX-1004", date: "2025-06-17", description: "Customer Payment - Global Tech", type: "Income", amount: "$12,840.75", status: "Completed" },
  { id: "TRX-1005", date: "2025-06-17", description: "Office Supplies", type: "Expense", amount: "$847.35", status: "Completed" },
  { id: "TRX-1006", date: "2025-06-16", description: "Customer Refund - Metro Industries", type: "Expense", amount: "$350.00", status: "Completed" },
  { id: "TRX-1007", date: "2025-06-16", description: "Utility Bill - Electricity", type: "Expense", amount: "$1,245.80", status: "Pending" },
  { id: "TRX-1008", date: "2025-06-15", description: "Customer Payment - XYZ Inc", type: "Income", amount: "$7,580.25", status: "Completed" },
];

// Reports list
const financialReportsData = [
  { id: "REP-001", name: "Income Statement", period: "Q2 2025", generated: "2025-06-15", format: "PDF" },
  { id: "REP-002", name: "Balance Sheet", period: "Q2 2025", generated: "2025-06-15", format: "PDF" },
  { id: "REP-003", name: "Cash Flow Statement", period: "Q2 2025", generated: "2025-06-15", format: "PDF" },
  { id: "REP-004", name: "Accounts Receivable Aging", period: "June 2025", generated: "2025-06-16", format: "XLSX" },
  { id: "REP-005", name: "Accounts Payable Aging", period: "June 2025", generated: "2025-06-16", format: "XLSX" },
];

export default function FinanceDashboard() {
  const [timeframe, setTimeframe] = useState("ytd");
  const [txnFilter, setTxnFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter transactions based on type
  const filteredTransactions = recentTransactionsData.filter(txn => {
    return txnFilter === "all" || txn.type.toLowerCase() === txnFilter.toLowerCase();
  });

  // Format currency helper function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Revenue YTD"
          value={financeStats.revenue}
          description={`${financeStats.trendRevenue} from last year`}
          trend="up"
          icon={<DollarSign className="h-5 w-5 text-white" />}
          iconClass="bg-green-500"
        />
        <StatsCard
          title="Expenses YTD"
          value={financeStats.expenses}
          description={`${financeStats.trendExpenses} from last year`}
          trend="up"
          icon={<FileText className="h-5 w-5 text-white" />}
          iconClass="bg-red-500"
        />
        <StatsCard
          title="Net Profit"
          value={financeStats.profit}
          description={`${financeStats.trendProfit} from last year`}
          trend="up"
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          iconClass="bg-blue-500"
        />
        <StatsCard
          title="Cash Flow"
          value={financeStats.cashFlow}
          description={`${financeStats.trendCashFlow} from last month`}
          trend="down"
          icon={<Layers className="h-5 w-5 text-white" />}
          iconClass="bg-purple-500"
        />
      </div>

      {/* Finance Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Financial Overview Chart */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Revenue, expenses and profit</CardDescription>
              </div>
              <div className="flex items-center gap-2">
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={monthlyFinanceData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                    <Bar dataKey="profit" name="Profit" fill="#22c55e" />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Accounts Receivable & Payable */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Accounts Receivable */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Accounts Receivable</CardTitle>
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Outstanding customer payments</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Invoice</th>
                      <th className="py-3 px-4 text-left font-medium">Customer</th>
                      <th className="py-3 px-4 text-left font-medium">Amount</th>
                      <th className="py-3 px-4 text-left font-medium">Due Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsReceivableData.map((invoice, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{invoice.id}</td>
                        <td className="py-3 px-4 text-sm">{invoice.customer}</td>
                        <td className="py-3 px-4 text-sm font-medium">{invoice.amount}</td>
                        <td className="py-3 px-4 text-sm">{invoice.date}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className={invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : "bg-red-100 text-red-800 hover:bg-red-100"}>
                            {invoice.status} {invoice.daysOverdue > 0 ? `(${invoice.daysOverdue} days)` : ''}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <div>
                  <p className="text-sm font-medium">Total Outstanding</p>
                  <p className="text-xl font-bold">$26,180</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </CardFooter>
            </Card>
            
            {/* Accounts Payable */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Accounts Payable</CardTitle>
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Upcoming payments to suppliers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Invoice</th>
                      <th className="py-3 px-4 text-left font-medium">Supplier</th>
                      <th className="py-3 px-4 text-left font-medium">Amount</th>
                      <th className="py-3 px-4 text-left font-medium">Due Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsPayableData.map((invoice, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{invoice.id}</td>
                        <td className="py-3 px-4 text-sm">{invoice.supplier}</td>
                        <td className="py-3 px-4 text-sm font-medium">{invoice.amount}</td>
                        <td className="py-3 px-4 text-sm">{invoice.date}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className={
                            invoice.status === "Scheduled" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                            "bg-red-100 text-red-800 hover:bg-red-100"
                          }>
                            {invoice.status} {invoice.daysUntilDue < 0 ? `(${Math.abs(invoice.daysUntilDue)} days)` : ''}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <div>
                  <p className="text-sm font-medium">Total Due</p>
                  <p className="text-xl font-bold">$27,940</p>
                </div>
                <Button>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Make Payment
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Transactions & Expense Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Transactions */}
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select defaultValue={txnFilter} onValueChange={setTxnFilter}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="income">Income Only</SelectItem>
                        <SelectItem value="expense">Expenses Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" className="text-sm">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="py-3 px-4 text-left font-medium">ID</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Description</th>
                        <th className="py-3 px-4 text-left font-medium">Type</th>
                        <th className="py-3 px-4 text-right font-medium">Amount</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.slice(0, 5).map((txn, idx) => (
                        <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{txn.id}</td>
                          <td className="py-3 px-4 text-sm">{txn.date}</td>
                          <td className="py-3 px-4 text-sm">{txn.description}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge className={txn.type === "Income" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}>
                              {txn.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-right">{txn.amount}</td>
                          <td className="py-3 px-4 text-sm">
                            <Badge className={txn.status === "Completed" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}>
                              {txn.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={expenseCategoriesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseCategoriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Income Tab Content */}
        <TabsContent value="income" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Income Statement</CardTitle>
                  <CardDescription>Profit & Loss Report</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="ytd">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Current Month</SelectItem>
                      <SelectItem value="quarter">Current Quarter</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Period</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Category</th>
                      <th className="py-3 px-4 text-right font-medium">Current</th>
                      <th className="py-3 px-4 text-right font-medium">Previous</th>
                      <th className="py-3 px-4 text-right font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitLossData.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <tr className={`${item.isTotal ? 'bg-gray-50 font-medium' : ''} hover:bg-gray-50`}>
                          <td className={`py-3 px-4 text-sm ${item.isTotal ? 'font-bold' : ''}`}>{item.category}</td>
                          <td className={`py-3 px-4 text-sm text-right ${item.isTotal ? 'font-bold' : ''}`}>
                            ${item.current.toLocaleString()}
                          </td>
                          <td className={`py-3 px-4 text-sm text-right ${item.isTotal ? 'font-bold' : ''}`}>
                            ${item.previous.toLocaleString()}
                          </td>
                          <td className={`py-3 px-4 text-sm text-right ${item.isTotal ? 'font-bold' : ''}`}>
                            <span className={item.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {item.change >= 0 ? '+' : ''}{item.change}%
                            </span>
                          </td>
                        </tr>
                        {item.items && item.items.map((subItem, subIdx) => (
                          <tr key={`${idx}-${subIdx}`} className="text-muted-foreground hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm pl-8">• {subItem.name}</td>
                            <td className="py-2 px-4 text-sm text-right">${subItem.current.toLocaleString()}</td>
                            <td className="py-2 px-4 text-sm text-right">${subItem.previous.toLocaleString()}</td>
                            <td className="py-2 px-4 text-sm text-right">
                              <span className={subItem.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {subItem.change >= 0 ? '+' : ''}{subItem.change}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab Content */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <ArrowDown className="h-5 w-5 mr-2 text-red-500" />
                  <CardTitle>Total Expenses</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">$745,410</p>
                  <p className="text-sm text-muted-foreground mt-1">+8.1% from last year</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle>Fixed Expenses</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">$520,000</p>
                  <p className="text-sm text-muted-foreground mt-1">69.8% of total expenses</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-green-500" />
                  <CardTitle>Variable Expenses</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">$225,410</p>
                  <p className="text-sm text-muted-foreground mt-1">30.2% of total expenses</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Expense Breakdown</CardTitle>
                <Select defaultValue="ytd">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Current Month</SelectItem>
                    <SelectItem value="quarter">Current Quarter</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Period</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={[
                      { category: "Payroll", amount: 335410 },
                      { category: "Materials", amount: 186350 },
                      { category: "Rent", amount: 96000 },
                      { category: "Marketing", amount: 74520 },
                      { category: "Utilities", amount: 32130 },
                      { category: "Other", amount: 21000 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="amount" name="Expense Amount" fill="#ef4444" />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Tab Content */}
        <TabsContent value="cashflow" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Cash Flow Statement</CardTitle>
                  <CardDescription>Overview of cash movements</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="ytd">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Current Month</SelectItem>
                      <SelectItem value="quarter">Current Quarter</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Period</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Category</th>
                      <th className="py-3 px-4 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashFlowData.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <tr className={`${item.isTotal ? 'bg-gray-50 font-medium' : ''} hover:bg-gray-50`}>
                          <td className={`py-3 px-4 text-sm ${item.isTotal ? 'font-bold' : ''}`}>{item.category}</td>
                          <td className={`py-3 px-4 text-sm text-right ${item.isTotal ? 'font-bold' : ''}`}>
                            <span className={item.direction === "inflow" ? 'text-green-600' : 'text-red-600'}>
                              {item.direction === "inflow" ? '+' : ''}{formatCurrency(item.amount)}
                            </span>
                          </td>
                        </tr>
                        {item.items && item.items.map((subItem, subIdx) => (
                          <tr key={`${idx}-${subIdx}`} className="text-muted-foreground hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm pl-8">• {subItem.name}</td>
                            <td className="py-2 px-4 text-sm text-right">
                              <span className={subItem.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {subItem.amount >= 0 ? '+' : ''}{formatCurrency(subItem.amount)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab Content */}
        <TabsContent value="reports">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Financial Reports</CardTitle>
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
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Report ID</th>
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Period</th>
                      <th className="py-3 px-4 text-left font-medium">Generated Date</th>
                      <th className="py-3 px-4 text-left font-medium">Format</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialReportsData.map((report, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{report.id}</td>
                        <td className="py-3 px-4 text-sm font-medium">{report.name}</td>
                        <td className="py-3 px-4 text-sm">{report.period}</td>
                        <td className="py-3 px-4 text-sm">{report.generated}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="outline">{report.format}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <Download className="h-3 w-3 mr-1" />
                              Download
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