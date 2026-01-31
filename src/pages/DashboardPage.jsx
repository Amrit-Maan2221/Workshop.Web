import React, { useEffect } from "react";
import { useTopbar } from "@/providers/TopbarContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import {
  Download, Filter, Plus, Wrench, Clock, AlertTriangle,
  CheckCircle2, TrendingUp, User2, MoreHorizontal, FileText, AlertCircle
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

// Recharts imports
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// --- MOCK DATA (Consolidated from your legacy and current requests) ---

const dashboardStats = [
  { title: 'Active Work Orders', value: '24', change: '+12%', trend: 'up' },
  { title: "Today's Revenue", value: '$8,425', change: '+8%', trend: 'up' },
  { title: 'Pending Invoices', value: '7', change: '-3%', trend: 'down' },
  { title: 'Low Stock Items', value: '5', change: '+2', trend: 'warning' },
];

const revenueData = [
  { month: 'Jan', revenue: 42000, expenses: 28000 },
  { month: 'Feb', revenue: 52000, expenses: 32000 },
  { month: 'Mar', revenue: 48000, expenses: 30000 },
  { month: 'Apr', revenue: 58000, expenses: 35000 },
  { month: 'May', revenue: 62000, expenses: 38000 },
  { month: 'Jun', revenue: 71000, expenses: 42000 },
];

const activeWorkOrders = [
  { id: 'WO-2024-0456', mechanic: 'John Doe', load: 85, status: 'Critical', since: '4h 30m', remarks: "Brake pad replacement" },
  { id: 'WO-2024-0457', mechanic: 'Sarah Smith', load: 60, status: 'In Progress', since: '2h 15m', remarks: "Oil change & filter" },
  { id: 'WO-2024-0458', mechanic: 'Mike Johnson', load: 45, status: 'On Hold', since: '1h 45m', remarks: "Transmission check" },
  { id: 'WO-2024-0459', mechanic: 'Emily Brown', load: 95, status: 'Critical', since: '6h 10m', remarks: "Engine diagnostic" },
  { id: 'WO-2024-0460', mechanic: 'David Wilson', load: 30, status: 'In Progress', since: '45m', remarks: "Suspension noise" },
  { id: 'WO-2024-0461', mechanic: 'Lisa Taylor', load: 75, status: 'In Progress', since: '3h 20m', remarks: "Battery replacement" },
];

const serviceTypeData = [
  // Segment 1: The Anchor (Zinc 900)
  { name: 'Maintenance', value: 35, color: 'hsl(240 5.9% 10%)' }, 
  
  // Segment 2: Deep Neutral (Zinc 600)
  { name: 'Repairs', value: 25, color: 'hsl(240 5.2% 33.9%)' }, 
  
  // Segment 3: Mid-tone (Zinc 400)
  { name: 'Diagnostics', value: 20, color: 'hsl(240 5% 64.9%)' }, 
  
  // Segment 4: Light Neutral (Zinc 200)
  { name: 'Body Work', value: 15, color: 'hsl(240 5.9% 90%)' }, 
  
  // Segment 5: Subtle/Other (Zinc 100)
  { name: 'Other', value: 5, color: 'hsl(240 4.8% 95.9%)' }, 
];

const workshopPerformanceData = [
  { mechanic: 'John D.', efficiency: 92, quality: 88, speed: 85 },
  { mechanic: 'Sarah M.', efficiency: 87, quality: 95, speed: 78 },
  { mechanic: 'Mike R.', efficiency: 95, quality: 82, speed: 92 },
  { mechanic: 'Lisa T.', efficiency: 88, quality: 90, speed: 87 },
  { mechanic: 'Tom B.', efficiency: 90, quality: 85, speed: 89 },
];

const inventoryData = [
  { part: 'Brake Pads', stock: 42, minLevel: 20, status: 'Good' },
  { part: 'Oil Filter', stock: 18, minLevel: 25, status: 'Low' },
  { part: 'Air Filter', stock: 35, minLevel: 15, status: 'Good' },
  { part: 'Battery', stock: 8, minLevel: 10, status: 'Critical' },
];

const recentInvoices = [
  { id: 'INV-001', customer: 'Robert Johnson', amount: '$850', status: 'Paid' },
  { id: 'INV-002', customer: 'Sarah Miller', amount: '$1,250', status: 'Pending' },
  { id: 'INV-004', customer: 'Emily Davis', amount: '$2,150', status: 'Overdue' },
];

export default function Dashboard() {
  const { setActions } = useTopbar();
  usePageTitle("Dashboard");

  return (
    <div className="flex-1 space-y-4 py-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="shadow-none border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardDescription className="text-sm font-medium">{stat.title}</CardDescription>
              {getStatIcon(stat.title)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}>
                  {stat.change}
                </span> from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* --- CENTRAL WIDGET: ACTIVE WORKORDERS BY MECHANIC --- */}
        <Card className="col-span-full lg:col-span-5 shadow-none border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Live Workshop Floor</CardTitle>
              <CardDescription>Real-time technician tracking</CardDescription>
            </div>
            <Badge variant="outline" className="font-mono">Live: {activeWorkOrders.length}</Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mechanic</TableHead>
                  <TableHead>Work Order</TableHead>
                  <TableHead>Active Since</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeWorkOrders.map((wo) => (
                  <TableRow key={wo.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User2 className="h-4 w-4 text-muted-foreground" />
                        {wo.mechanic}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{wo.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 w-[120px]">
                        <span className="text-[11px] text-muted-foreground font-medium uppercase">{wo.since}</span>
                        <Progress value={wo.load} className="h-1" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={wo.status === "Critical" ? "destructive" : "secondary"}>
                        {wo.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Service Type Distribution Pie */}
        <Card className="col-span-full lg:col-span-2 shadow-none border border-border">
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Fix: Added explicit height wrapper */}
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    paddingAngle={5}
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Area Chart */}
        <Card className="shadow-none border border-border">
          <CardHeader>
            <CardTitle>Financial Performance</CardTitle>
            <CardDescription>Revenue vs Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Fix: Explicit height on this div is mandatory for ResponsiveContainer */}
            <div className="h-[320px] w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis fontSize={12} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar */}
        <Card className="shadow-none border border-border">
          <CardHeader>
            <CardTitle>Technician Efficiency</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={workshopPerformanceData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="mechanic" fontSize={12} />
                <Radar name="Efficiency" dataKey="efficiency" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Inventory Widget */}
        <Card className="shadow-none border border-border">
          <CardHeader><CardTitle>Inventory Pulse</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Part</TableHead><TableHead>Stock</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {inventoryData.map(item => (
                  <TableRow key={item.part}>
                    <TableCell className="text-sm">{item.part}</TableCell>
                    <TableCell className="text-sm">{item.stock}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Critical' ? 'destructive' : 'outline'} className="text-[10px]">
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Invoices Widget */}
        <Card className="shadow-none border border-border">
          <CardHeader><CardTitle>Recent Billing</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Customer</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {recentInvoices.map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                    <TableCell className="text-sm">{inv.customer}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{inv.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatIcon(title) {
  const iconClass = "h-4 w-4 text-muted-foreground";
  switch (title) {
    case 'Active Work Orders': return <Wrench className={iconClass} />;
    case "Today's Revenue": return <TrendingUp className={iconClass} />;
    case 'Pending Invoices': return <FileText className={iconClass} />;
    case 'Low Stock Items': return <AlertCircle className={iconClass} />;
    default: return <Clock className={iconClass} />;
  }
}