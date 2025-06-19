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
  Briefcase, 
  Calendar, 
  ClipboardList, 
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  Clock,
  CheckSquare,
  Users,
  Timer,
  AlertCircle,
  Play,
  Pause,
  ChevronDown,
  Tag
} from "lucide-react";
import {
  LineChart,
  Line,
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

// Project stats
const projectStats = {
  totalProjects: 42,
  inProgress: 24,
  completed: 15,
  overdue: 3,
  trendTotal: "+12.5%",
  trendProgress: "+8.2%",
  trendCompleted: "+15.3%",
  trendOverdue: "-2.1%",
};

// Projects data
const projectsData = [
  { 
    id: "PRJ-001", 
    name: "ERP System Implementation", 
    client: "Acme Corporation",
    manager: "John Smith",
    startDate: "2025-01-15", 
    dueDate: "2025-08-15", 
    progress: 75, 
    status: "On Track", 
    budget: "$125,000",
    spent: "$92,500",
    team: ["JD", "MS", "AK", "BL"]
  },
  { 
    id: "PRJ-002", 
    name: "Warehouse Expansion", 
    client: "Global Logistics",
    manager: "Sarah Johnson",
    startDate: "2025-03-10", 
    dueDate: "2025-07-30", 
    progress: 45, 
    status: "At Risk", 
    budget: "$300,000",
    spent: "$182,500",
    team: ["RJ", "TM", "PC"]
  },
  { 
    id: "PRJ-003", 
    name: "Supply Chain Optimization", 
    client: "Tech Manufacturing Inc.",
    manager: "Michael Chen",
    startDate: "2025-04-05", 
    dueDate: "2025-06-30", 
    progress: 90, 
    status: "On Track", 
    budget: "$85,000",
    spent: "$76,500",
    team: ["KP", "LW", "MJ"]
  },
  { 
    id: "PRJ-004", 
    name: "New Product Launch", 
    client: "InnovateTech",
    manager: "Jennifer Lee",
    startDate: "2025-02-20", 
    dueDate: "2025-09-01", 
    progress: 60, 
    status: "At Risk", 
    budget: "$150,000",
    spent: "$89,750",
    team: ["SB", "AR", "CP", "DH"]
  },
  { 
    id: "PRJ-005", 
    name: "CRM Integration", 
    client: "RetailPro Inc.",
    manager: "David Wilson",
    startDate: "2025-05-15", 
    dueDate: "2025-07-15", 
    progress: 35, 
    status: "On Track", 
    budget: "$65,000",
    spent: "$22,500",
    team: ["MR", "JT", "AW"]
  },
  { 
    id: "PRJ-006", 
    name: "Office Renovation", 
    client: "Internal",
    manager: "Lisa Rodriguez",
    startDate: "2025-03-01", 
    dueDate: "2025-06-15", 
    progress: 95, 
    status: "Completed", 
    budget: "$120,000",
    spent: "$118,500",
    team: ["GS", "HJ", "KL"]
  },
  { 
    id: "PRJ-007", 
    name: "Financial System Upgrade", 
    client: "FinCorp",
    manager: "Robert Brown",
    startDate: "2025-05-10", 
    dueDate: "2025-08-10", 
    progress: 25, 
    status: "On Track", 
    budget: "$95,000",
    spent: "$23,500",
    team: ["EC", "TW", "RS"]
  },
];

// Tasks data
const tasksData = [
  { id: 1, title: "Define system requirements", project: "ERP System Implementation", assignee: "JD", dueDate: "2025-06-20", status: "Completed", priority: "High" },
  { id: 2, title: "Design database architecture", project: "ERP System Implementation", assignee: "MS", dueDate: "2025-06-25", status: "In Progress", priority: "High" },
  { id: 3, title: "Develop user interface", project: "ERP System Implementation", assignee: "AK", dueDate: "2025-07-10", status: "Not Started", priority: "Medium" },
  { id: 4, title: "Conduct site assessment", project: "Warehouse Expansion", assignee: "RJ", dueDate: "2025-06-15", status: "Completed", priority: "High" },
  { id: 5, title: "Finalize construction plans", project: "Warehouse Expansion", assignee: "TM", dueDate: "2025-06-22", status: "In Progress", priority: "High" },
  { id: 6, title: "Analyze current supply chain", project: "Supply Chain Optimization", assignee: "KP", dueDate: "2025-06-18", status: "Completed", priority: "Medium" },
  { id: 7, title: "Develop optimization recommendations", project: "Supply Chain Optimization", assignee: "LW", dueDate: "2025-06-24", status: "In Progress", priority: "High" },
  { id: 8, title: "Create marketing materials", project: "New Product Launch", assignee: "SB", dueDate: "2025-06-28", status: "In Progress", priority: "Medium" },
  { id: 9, title: "Prepare sales training", project: "New Product Launch", assignee: "AR", dueDate: "2025-07-05", status: "Not Started", priority: "Medium" },
  { id: 10, title: "Configure CRM software", project: "CRM Integration", assignee: "MR", dueDate: "2025-06-30", status: "In Progress", priority: "High" },
];

// Team members
const teamMembersData = [
  { id: 1, name: "John Doe", avatar: "JD", role: "Project Manager", activeProjects: 3, tasksCompleted: 24, hoursLogged: 142 },
  { id: 2, name: "Mary Smith", avatar: "MS", role: "Systems Analyst", activeProjects: 2, tasksCompleted: 18, hoursLogged: 136 },
  { id: 3, name: "Alex Kumar", avatar: "AK", role: "UI Designer", activeProjects: 4, tasksCompleted: 15, hoursLogged: 128 },
  { id: 4, name: "Rebecca Jones", avatar: "RJ", role: "Civil Engineer", activeProjects: 1, tasksCompleted: 10, hoursLogged: 112 },
  { id: 5, name: "Tom Martinez", avatar: "TM", role: "Construction Manager", activeProjects: 2, tasksCompleted: 12, hoursLogged: 122 },
  { id: 6, name: "Karen Park", avatar: "KP", role: "Supply Chain Analyst", activeProjects: 2, tasksCompleted: 14, hoursLogged: 132 },
  { id: 7, name: "Lily Wang", avatar: "LW", role: "Business Analyst", activeProjects: 3, tasksCompleted: 20, hoursLogged: 145 },
  { id: 8, name: "Sarah Brown", avatar: "SB", role: "Marketing Specialist", activeProjects: 2, tasksCompleted: 16, hoursLogged: 108 },
];

export default function ProjectsDashboard() {
  const [projectFilter, setProjectFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on status and search term
  const filteredProjects = projectsData.filter(project => {
    const matchesStatus = projectFilter === "all" || 
                          project.status.toLowerCase().replace(/\s+/g, '') === projectFilter.toLowerCase().replace(/\s+/g, '');
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={projectStats.totalProjects.toString()}
          description={`${projectStats.trendTotal} from last month`}
          trend="up"
          icon={<Briefcase className="h-5 w-5 text-white" />}
          iconClass="bg-blue-500"
        />
        <StatsCard
          title="In Progress"
          value={projectStats.inProgress.toString()}
          description={`${projectStats.trendProgress} from last month`}
          trend="up"
          icon={<ClipboardList className="h-5 w-5 text-white" />}
          iconClass="bg-purple-500"
        />
        <StatsCard
          title="Completed"
          value={projectStats.completed.toString()}
          description={`${projectStats.trendCompleted} from last month`}
          trend="up"
          icon={<CheckSquare className="h-5 w-5 text-white" />}
          iconClass="bg-green-500"
        />
        <StatsCard
          title="Overdue"
          value={projectStats.overdue.toString()}
          description={`${projectStats.trendOverdue} from last month`}
          trend="down"
          icon={<Clock className="h-5 w-5 text-white" />}
          iconClass="bg-red-500"
        />
      </div>

      {/* Project Tabs */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Project Management</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search projects..."
                      className="w-full pl-8 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={projectFilter} onValueChange={setProjectFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="ontrack">On Track</SelectItem>
                      <SelectItem value="atrisk">At Risk</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Project</th>
                      <th className="py-3 px-4 text-left font-medium">Client</th>
                      <th className="py-3 px-4 text-left font-medium">Due Date</th>
                      <th className="py-3 px-4 text-left font-medium">Progress</th>
                      <th className="py-3 px-4 text-left font-medium">Budget</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Team</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium">{project.name}</p>
                            <p className="text-xs text-muted-foreground">{project.id}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{project.client}</td>
                        <td className="py-3 px-4 text-sm">{project.dueDate}</td>
                        <td className="py-3 px-4">
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-1 text-xs">
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium">{project.budget}</p>
                            <p className="text-xs text-muted-foreground">Spent: {project.spent}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {getStatusBadge(project.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member, i) => (
                              <Avatar key={i} className="border-2 border-white h-7 w-7">
                                <AvatarFallback className="text-xs bg-primary text-primary-foreground">{member}</AvatarFallback>
                              </Avatar>
                            ))}
                            {project.team.length > 3 && (
                              <Avatar className="border-2 border-white h-7 w-7">
                                <AvatarFallback className="text-xs bg-gray-200 text-gray-600">+{project.team.length - 3}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
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
                Showing {filteredProjects.length} of {projectsData.length} projects
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
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Upcoming project milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { project: "ERP System Implementation", milestone: "Complete user testing", date: "2025-06-25", daysLeft: 6 },
                    { project: "Warehouse Expansion", milestone: "Foundation completion", date: "2025-06-28", daysLeft: 9 },
                    { project: "Supply Chain Optimization", milestone: "Stakeholder review", date: "2025-06-22", daysLeft: 3 },
                    { project: "New Product Launch", milestone: "Marketing assets finalized", date: "2025-06-30", daysLeft: 11 },
                    { project: "CRM Integration", milestone: "Initial data migration", date: "2025-06-24", daysLeft: 5 },
                  ].map((milestone, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="min-w-10 mt-1">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-blue-700" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{milestone.milestone}</p>
                          <Badge variant="outline" className="text-xs">
                            {milestone.daysLeft} days left
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{milestone.project}</p>
                        <p className="text-xs text-muted-foreground">{milestone.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
                <CardDescription>Current project status overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "On Track", value: 24, color: "#22c55e" },
                          { name: "At Risk", value: 12, color: "#eab308" },
                          { name: "Completed", value: 15, color: "#3b82f6" },
                          { name: "Overdue", value: 3, color: "#ef4444" },
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
                          { name: "On Track", value: 24, color: "#22c55e" },
                          { name: "At Risk", value: 12, color: "#eab308" },
                          { name: "Completed", value: 15, color: "#3b82f6" },
                          { name: "Overdue", value: 3, color: "#ef4444" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <CheckSquare className="h-5 w-5 mr-2 text-green-500" />
                  <CardTitle>Tasks Completed</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">152</p>
                  <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle>In Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">38</p>
                  <p className="text-sm text-muted-foreground mt-1">Across all projects</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                  <CardTitle>Overdue Tasks</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground mt-1">Requires attention</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Task Management</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="notstarted">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Task</th>
                      <th className="py-3 px-4 text-left font-medium">Project</th>
                      <th className="py-3 px-4 text-left font-medium">Assignee</th>
                      <th className="py-3 px-4 text-left font-medium">Due Date</th>
                      <th className="py-3 px-4 text-left font-medium">Priority</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasksData.map((task, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{task.title}</td>
                        <td className="py-3 px-4 text-sm">{task.project}</td>
                        <td className="py-3 px-4">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">{task.assignee}</AvatarFallback>
                          </Avatar>
                        </td>
                        <td className="py-3 px-4 text-sm">{task.dueDate}</td>
                        <td className="py-3 px-4 text-sm">
                          {getPriorityBadge(task.priority)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {getTaskStatusBadge(task.status)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              {task.status === "In Progress" ? (
                                <>
                                  <Pause className="h-3 w-3 mr-2" />
                                  Pause
                                </>
                              ) : task.status === "Completed" ? (
                                <>
                                  <CheckSquare className="h-3 w-3 mr-2" />
                                  Done
                                </>
                              ) : (
                                <>
                                  <Play className="h-3 w-3 mr-2" />
                                  Start
                                </>
                              )}
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
                Showing 10 of 68 tasks
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Role</th>
                      <th className="py-3 px-4 text-left font-medium">Active Projects</th>
                      <th className="py-3 px-4 text-left font-medium">Tasks Completed</th>
                      <th className="py-3 px-4 text-left font-medium">Hours Logged</th>
                      <th className="py-3 px-4 text-left font-medium">Utilization</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembersData.map((member, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{member.role}</td>
                        <td className="py-3 px-4 text-sm">{member.activeProjects}</td>
                        <td className="py-3 px-4 text-sm">{member.tasksCompleted}</td>
                        <td className="py-3 px-4 text-sm">{member.hoursLogged}</td>
                        <td className="py-3 px-4">
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-1 text-xs">
                              <span>{Math.floor(member.hoursLogged / 160 * 100)}%</span>
                            </div>
                            <Progress value={Math.floor(member.hoursLogged / 160 * 100)} className="h-2" />
                          </div>
                        </td>
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
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Team Workload</CardTitle>
                <CardDescription>Project allocation by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={teamMembersData.slice(0, 6).map(member => ({
                        name: member.name,
                        activeProjects: member.activeProjects,
                        availableCapacity: 5 - member.activeProjects
                      }))}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activeProjects" stackId="a" name="Active Projects" fill="#4f46e5" />
                      <Bar dataKey="availableCapacity" stackId="a" name="Available Capacity" fill="#e5e7eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Time Tracking</CardTitle>
                <CardDescription>Hours logged by project this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "ERP System Implementation", value: 420, color: "#4f46e5" },
                          { name: "Warehouse Expansion", value: 280, color: "#0ea5e9" },
                          { name: "Supply Chain Optimization", value: 210, color: "#22c55e" },
                          { name: "New Product Launch", value: 150, color: "#f59e0b" },
                          { name: "Other Projects", value: 110, color: "#64748b" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => 
                          percent > 0.05 ? `${name.substring(0, 10)}${name.length > 10 ? '...' : ''} ${(percent * 100).toFixed(0)}%` : ''}
                      >
                        {[
                          { name: "ERP System Implementation", value: 420, color: "#4f46e5" },
                          { name: "Warehouse Expansion", value: 280, color: "#0ea5e9" },
                          { name: "Supply Chain Optimization", value: 210, color: "#22c55e" },
                          { name: "New Product Launch", value: 150, color: "#f59e0b" },
                          { name: "Other Projects", value: 110, color: "#64748b" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} hours`, 'Time Logged']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Project Completion Trend</CardTitle>
                <CardDescription>Monthly completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", completed: 3, started: 5 },
                        { month: "Feb", completed: 4, started: 4 },
                        { month: "Mar", completed: 2, started: 6 },
                        { month: "Apr", completed: 5, started: 7 },
                        { month: "May", completed: 6, started: 5 },
                        { month: "Jun", completed: 4, started: 3 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="completed" name="Projects Completed" stroke="#22c55e" strokeWidth={2} />
                      <Line type="monotone" dataKey="started" name="Projects Started" stroke="#4f46e5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Budget vs. Actual Spending</CardTitle>
                <CardDescription>Project financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "ERP Impl.", budget: 125000, actual: 92500 },
                        { name: "Warehouse", budget: 300000, actual: 182500 },
                        { name: "Supply Chain", budget: 85000, actual: 76500 },
                        { name: "Product Launch", budget: 150000, actual: 89750 },
                        { name: "CRM Int.", budget: 65000, actual: 22500 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#4f46e5" />
                      <Bar dataKey="actual" name="Actual Spent" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm mt-6">
            <CardHeader>
              <CardTitle>Project Performance Metrics</CardTitle>
              <CardDescription>Key project indicators and performance</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="py-3 px-4 text-left font-medium">Project</th>
                      <th className="py-3 px-4 text-right font-medium">On-Time Completion</th>
                      <th className="py-3 px-4 text-right font-medium">Budget Adherence</th>
                      <th className="py-3 px-4 text-right font-medium">Team Utilization</th>
                      <th className="py-3 px-4 text-right font-medium">Scope Changes</th>
                      <th className="py-3 px-4 text-right font-medium">Overall Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "ERP System Implementation", onTime: 92, budget: 88, utilization: 85, scope: 4, score: "A-" },
                      { name: "Warehouse Expansion", onTime: 78, budget: 96, utilization: 72, scope: 2, score: "B+" },
                      { name: "Supply Chain Optimization", onTime: 95, budget: 94, utilization: 88, scope: 1, score: "A" },
                      { name: "New Product Launch", onTime: 82, budget: 72, utilization: 68, scope: 7, score: "B" },
                      { name: "CRM Integration", onTime: 90, budget: 98, utilization: 75, scope: 3, score: "B+" },
                    ].map((project, idx) => (
                      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{project.name}</td>
                        <td className="py-3 px-4 text-sm text-right">
                          <div className="inline-flex items-center">
                            <span className={project.onTime >= 90 ? "text-green-600" : 
                                           project.onTime >= 80 ? "text-yellow-600" : "text-red-600"}>
                              {project.onTime}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          <div className="inline-flex items-center">
                            <span className={project.budget >= 90 ? "text-green-600" : 
                                           project.budget >= 80 ? "text-yellow-600" : "text-red-600"}>
                              {project.budget}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          <div className="inline-flex items-center">
                            <span className={project.utilization >= 85 ? "text-green-600" : 
                                           project.utilization >= 75 ? "text-yellow-600" : "text-red-600"}>
                              {project.utilization}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          <div className="inline-flex items-center">
                            <span className={project.scope <= 2 ? "text-green-600" : 
                                           project.scope <= 5 ? "text-yellow-600" : "text-red-600"}>
                              {project.scope}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-bold">
                          {project.score}
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

/**
 * Returns a Badge component styled based on project status
 */
function getStatusBadge(status) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "on track":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>;
    case "at risk":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">At Risk</Badge>;
    case "completed":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
    case "overdue":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

/**
 * Returns a Badge component styled based on task priority
 */
function getPriorityBadge(priority) {
  const normalized = priority.toLowerCase();
  switch (normalized) {
    case "high":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
    case "low":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}

/**
 * Returns a Badge component styled based on task status
 */
function getTaskStatusBadge(status) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    case "in progress":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
    case "not started":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Started</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}