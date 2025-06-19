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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Package, 
  AlertCircle, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MoreHorizontal,
  Truck,
  Search,
  Filter,
  Plus,
  Warehouse,
  BarChart,
  RefreshCw,
  FileText,
  Archive,
  RotateCcw
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
  Legend
} from "recharts";

// Inventory stats
const inventoryStats = {
  totalItems: 1256,
  lowStock: 28,
  outOfStock: 15,
  inventoryValue: "$1.28M",
  trendTotal: "+3.2%",
  trendLow: "+12.5%",
  trendOut: "-8.3%",
  trendValue: "+3.2%"
};

// Inventory status breakdown
const inventoryStatusData = [
  { name: "In Stock", value: 1213, color: "#22c55e" },
  { name: "Low Stock", value: 28, color: "#eab308" },
  { name: "Out of Stock", value: 15, color: "#ef4444" },
];

// Stock movement data
const stockMovementData = [
  { name: "Week 1", incoming: 120, outgoing: 85 },
  { name: "Week 2", incoming: 145, outgoing: 132 },
  { name: "Week 3", incoming: 105, outgoing: 118 },
  { name: "Week 4", incoming: 178, outgoing: 142 }
];

// Inventory items
const inventoryItemsData = [
  { id: "INV-001", name: "Smartphone XYZ", sku: "SM-XYZ-001", category: "Electronics", stock: 142, reorderLevel: 30, lastUpdated: "2025-06-18", status: "In Stock" },
  { id: "INV-002", name: "Wireless Headphones", sku: "WH-BLU-002", category: "Electronics", stock: 24, reorderLevel: 25, lastUpdated: "2025-06-17", status: "Low Stock" },
  { id: "INV-003", name: "Casual T-Shirt", sku: "CT-BLK-003", category: "Clothing", stock: 315, reorderLevel: 50, lastUpdated: "2025-06-15", status: "In Stock" },
  { id: "INV-004", name: "Smart Watch Pro", sku: "SW-PRO-004", category: "Electronics", stock: 8, reorderLevel: 15, lastUpdated: "2025-06-16", status: "Critical" },
  { id: "INV-005", name: "Leather Wallet", sku: "LW-BRW-005", category: "Accessories", stock: 67, reorderLevel: 20, lastUpdated: "2025-06-18", status: "In Stock" },
  { id: "INV-006", name: "Gaming Mouse", sku: "GM-RGB-006", category: "Electronics", stock: 0, reorderLevel: 10, lastUpdated: "2025-06-14", status: "Out of Stock" },
  { id: "INV-007", name: "Coffee Maker", sku: "CM-PRO-007", category: "Home", stock: 12, reorderLevel: 15, lastUpdated: "2025-06-13", status: "Low Stock" },
  { id: "INV-008", name: "Desk Lamp", sku: "DL-LED-008", category: "Home", stock: 42, reorderLevel: 10, lastUpdated: "2025-06-18", status: "In Stock" },
  { id: "INV-009", name: "Yoga Mat", sku: "YM-BLU-009", category: "Fitness", stock: 31, reorderLevel: 15, lastUpdated: "2025-06-16", status: "In Stock" },
  { id: "INV-010", name: "Water Bottle", sku: "WB-STL-010", category: "Fitness", stock: 5, reorderLevel: 20, lastUpdated: "2025-06-15", status: "Critical" },
];

// Warehouse data
const warehouseData = [
  { id: 1, name: "Main Warehouse", location: "New York", capacity: 85, items: 758, value: "$570,420" },
  { id: 2, name: "West Facility", location: "Los Angeles", capacity: 65, items: 321, value: "$412,350" },
  { id: 3, name: "South Center", location: "Miami", capacity: 45, items: 177, value: "$298,230" },
];

// Pending shipments data
const pendingShipmentsData = [
  { id: "PO-1001", supplier: "ABC Suppliers", items: 24, date: "2025-06-21", status: "In Transit" },
  { id: "PO-1002", supplier: "XYZ Manufacturing", items: 32, date: "2025-06-23", status: "Processing" },
  { id: "PO-1003", supplier: "Global Goods", items: 18, date: "2025-06-25", status: "Confirmed" },
  { id: "PO-1004", supplier: "Prime Materials", items: 45, date: "2025-06-28", status: "Processing" },
];

export default function InventoryDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  // Filter inventory items based on search and category
  const filteredItems = inventoryItemsData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || item.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Stock Items"
          value={inventoryStats.totalItems.toString()}
          description={`${inventoryStats.trendTotal} from last month`}
          trend="up"
          icon={<Package className="h-5 w-5 text-white" />}
          iconClass="bg-blue-500"
        />
        <StatsCard
          title="Low Stock Items"
          value={inventoryStats.lowStock.toString()}
          description={`${inventoryStats.trendLow} from last month`}
          trend="up"
          icon={<AlertCircle className="h-5 w-5 text-white" />}
          iconClass="bg-yellow-500"
        />
        <StatsCard
          title="Out of Stock"
          value={inventoryStats.outOfStock.toString()}
          description={`${inventoryStats.trendOut} from last month`}
          trend="down"
          icon={<AlertCircle className="h-5 w-5 text-white" />}
          iconClass="bg-red-500"
        />
        <StatsCard
          title="Inventory Value"
          value={inventoryStats.inventoryValue}
          description={`${inventoryStats.trendValue} from last month`}
          trend="up"
          icon={<DollarSign className="h-5 w-5 text-white" />}
          iconClass="bg-green-500"
        />
      </div>

      {/* Inventory Tabs */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Inventory Management</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full pl-8 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
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
                      <th className="py-3 px-4 text-left font-medium">Product Name</th>
                      <th className="py-3 px-4 text-left font-medium">SKU</th>
                      <th className="py-3 px-4 text-left font-medium">Category</th>
                      <th className="py-3 px-4 text-left font-medium">In Stock</th>
                      <th className="py-3 px-4 text-left font-medium">Reorder Level</th>
                      <th className="py-3 px-4 text-left font-medium">Last Updated</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{item.id}</td>
                        <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                        <td className="py-3 px-4 text-sm">{item.sku}</td>
                        <td className="py-3 px-4 text-sm">{item.category}</td>
                        <td className="py-3 px-4 text-sm">{item.stock}</td>
                        <td className="py-3 px-4 text-sm">{item.reorderLevel}</td>
                        <td className="py-3 px-4 text-sm">{item.lastUpdated}</td>
                        <td className="py-3 px-4 text-sm">
                          {getInventoryStatusBadge(item.status)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">Edit</Button>
                            <Button variant="outline" size="sm" className="h-8 px-2">Restock</Button>
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
                Showing {filteredItems.length} of {inventoryItemsData.length} items
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
                <CardTitle>Stock Movement</CardTitle>
                <CardDescription>Incoming and outgoing inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={stockMovementData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="incoming" stroke="#4f46e5" name="Incoming" />
                      <Line type="monotone" dataKey="outgoing" stroke="#ef4444" name="Outgoing" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Upcoming Deliveries</CardTitle>
                <CardDescription>Expected inventory arrivals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingShipmentsData.map((delivery, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{delivery.id}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{delivery.supplier}</p>
                        <p className="text-xs">Items: {delivery.items}</p>
                      </div>
                      <div>
                        <Badge className={getDeliveryStatusBadgeColor(delivery.status)}>{delivery.status}</Badge>
                        <p className="text-xs text-right mt-1">{delivery.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Warehouses Tab */}
        <TabsContent value="warehouses">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warehouseData.map((warehouse, idx) => (
              <Card key={idx} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Warehouse className="h-5 w-5 mr-2 text-blue-500" />
                      <CardTitle>{warehouse.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>{warehouse.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>Capacity Usage</span>
                        <span>{warehouse.capacity}%</span>
                      </div>
                      <Progress value={warehouse.capacity} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Items</p>
                        <p className="text-xl font-bold">{warehouse.items}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="text-xl font-bold">{warehouse.value}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <BarChart className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Inventory
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="shadow-sm mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Warehouse Inventory Transfers</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Transfer
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="py-3 px-4 text-left font-medium">Transfer ID</th>
                    <th className="py-3 px-4 text-left font-medium">From</th>
                    <th className="py-3 px-4 text-left font-medium">To</th>
                    <th className="py-3 px-4 text-left font-medium">Items</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "TRF-1001", from: "Main Warehouse", to: "West Facility", items: 12, date: "2025-06-20", status: "Pending" },
                    { id: "TRF-1002", from: "South Center", to: "Main Warehouse", items: 8, date: "2025-06-18", status: "Completed" },
                    { id: "TRF-1003", from: "West Facility", to: "South Center", items: 15, date: "2025-06-17", status: "In Transit" },
                    { id: "TRF-1004", from: "Main Warehouse", to: "South Center", items: 5, date: "2025-06-16", status: "Completed" },
                  ].map((transfer, idx) => (
                    <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium">{transfer.id}</td>
                      <td className="py-3 px-4 text-sm">{transfer.from}</td>
                      <td className="py-3 px-4 text-sm">{transfer.to}</td>
                      <td className="py-3 px-4 text-sm">{transfer.items}</td>
                      <td className="py-3 px-4 text-sm">{transfer.date}</td>
                      <td className="py-3 px-4 text-sm">
                        <Badge className={getTransferStatusBadgeColor(transfer.status)}>{transfer.status}</Badge>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Inventory Turnover</CardTitle>
                <CardDescription>How quickly items sell over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", turnover: 3.2 },
                        { month: "Feb", turnover: 3.4 },
                        { month: "Mar", turnover: 3.7 },
                        { month: "Apr", turnover: 3.5 },
                        { month: "May", turnover: 3.8 },
                        { month: "Jun", turnover: 4.2 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value.toFixed(1), 'Turnover Rate']} />
                      <Legend />
                      <Line type="monotone" dataKey="turnover" stroke="#4f46e5" name="Inventory Turnover" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center mt-4">
                  {["Electronics", "Clothing", "Home", "Accessories"].map((category, idx) => (
                    <div key={idx} className="p-2 rounded-md bg-gray-50">
                      <p className="text-lg font-bold">{(3.5 + idx * 0.4).toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground">{category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Current stock levels by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {inventoryStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Items']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mt-4">
                  {inventoryStatusData.map((status, idx) => (
                    <div key={idx} className="p-2 rounded-md" style={{ backgroundColor: `${status.color}20` }}>
                      <p className="text-lg font-bold">{status.value}</p>
                      <p className="text-xs text-muted-foreground">{status.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm mt-6">
            <CardHeader>
              <CardTitle>Inventory Value by Category</CardTitle>
              <CardDescription>Distribution of inventory value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={[
                      { category: "Electronics", value: 520000 },
                      { category: "Clothing", value: 345000 },
                      { category: "Home", value: 210000 },
                      { category: "Accessories", value: 125000 },
                      { category: "Fitness", value: 80000 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                    <Legend />
                    <Bar dataKey="value" name="Inventory Value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardFooter>
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

/**
 * Returns a Badge component styled based on inventory status
 */
function getInventoryStatusBadge(status) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "in stock":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>;
    case "low stock":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>;
    case "critical":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Critical</Badge>;
    case "out of stock":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

/**
 * Returns a color class based on delivery status
 */
function getDeliveryStatusBadgeColor(status) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "in transit":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "processing":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "confirmed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "delayed":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

/**
 * Returns a color class based on transfer status
 */
function getTransferStatusBadgeColor(status) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "in transit":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}