import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import dashboard modules
import OverviewDashboard from "./dashboards/OverviewDashboard";
import SalesDashboard from "./dashboards/SalesDashboard";
import InventoryDashboard from "./dashboards/InventoryDashboard";
import FinanceDashboard from "./dashboards/FinanceDashboard";
import ProjectsDashboard from "./dashboards/ProjectsDashboard";
import HRDashboard from "./dashboards/HRDashboard";
import ReportsDashboard from "./dashboards/ReportsDashboard";

// Notifications data
const notificationsData = [
  { id: 1, title: "Low stock alert: 3 products below threshold", time: "10 minutes ago", type: "alert" },
  { id: 2, title: "New customer registration: Emma Wilson", time: "30 minutes ago", type: "info" },
  { id: 3, title: "Order #ORD-1234 has been shipped", time: "1 hour ago", type: "success" },
  { id: 4, title: "Monthly financial report is ready for review", time: "2 hours ago", type: "info" },
  { id: 5, title: "System maintenance scheduled for tonight", time: "3 hours ago", type: "warning" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, 2025-06-19 | <span className="font-medium">sayanm085</span></p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-white"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  5
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notificationsData.map(notification => (
                <DropdownMenuItem key={notification.id} className="cursor-pointer py-2">
                  <div className="flex gap-3 items-start">
                    <div className={`mt-0.5 rounded-full p-1 ${getNotificationIconColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center font-medium">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="overview">
          <OverviewDashboard />
        </TabsContent>
        
        <TabsContent value="sales">
          <SalesDashboard />
        </TabsContent>
        
        <TabsContent value="inventory">
          <InventoryDashboard />
        </TabsContent>
        
        <TabsContent value="finance">
          <FinanceDashboard />
        </TabsContent>
        
        <TabsContent value="projects">
          <ProjectsDashboard />
        </TabsContent>
        
        <TabsContent value="hr">
          <HRDashboard />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Returns an icon component based on notification type
 */
function getNotificationIcon(type) {
  switch (type) {
    case "alert":
      return <AlertCircle className="h-4 w-4 text-white" />;
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-white" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-white" />;
    case "info":
    default:
      return <Bell className="h-4 w-4 text-white" />;
  }
}

/**
 * Returns a color class based on notification type
 */
function getNotificationIconColor(type) {
  switch (type) {
    case "alert":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "info":
    default:
      return "bg-blue-500";
  }
}