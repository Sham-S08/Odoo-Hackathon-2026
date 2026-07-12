"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  UserCheck,
  Wrench,
  Calendar,
  Download,
  Printer,
  Filter,
  Search,
  ChevronDown,
  PieChart,
  LineChart,
  Activity,
  Users,
  Building2,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Eye,
  Calendar as CalendarIcon,
  RefreshCw,
  X
} from "lucide-react";

// Mock data for charts
const mockChartData = {
  utilization: [
    { month: "Jan", assets: 120 },
    { month: "Feb", assets: 145 },
    { month: "Mar", assets: 180 },
    { month: "Apr", assets: 165 },
    { month: "May", assets: 210 },
    { month: "Jun", assets: 235 },
    { month: "Jul", assets: 260 },
    { month: "Aug", assets: 290 },
    { month: "Sep", assets: 275 },
    { month: "Oct", assets: 310 },
    { month: "Nov", assets: 345 },
    { month: "Dec", assets: 380 },
  ],
  maintenance: [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 8 },
    { month: "Mar", count: 15 },
    { month: "Apr", count: 10 },
    { month: "May", count: 18 },
    { month: "Jun", count: 14 },
    { month: "Jul", count: 20 },
    { month: "Aug", count: 16 },
    { month: "Sep", count: 11 },
    { month: "Oct", count: 9 },
    { month: "Nov", count: 13 },
    { month: "Dec", count: 7 },
  ],
  bookings: [
    { time: "8 AM", count: 2 },
    { time: "9 AM", count: 5 },
    { time: "10 AM", count: 8 },
    { time: "11 AM", count: 6 },
    { time: "12 PM", count: 4 },
    { time: "1 PM", count: 3 },
    { time: "2 PM", count: 7 },
    { time: "3 PM", count: 9 },
    { time: "4 PM", count: 5 },
    { time: "5 PM", count: 3 },
  ],
  categories: [
    { name: "Electronics", value: 342 },
    { name: "Furniture", value: 156 },
    { name: "Vehicles", value: 23 },
    { name: "Office Equipment", value: 89 },
    { name: "Other", value: 45 },
  ],
  departmentAllocation: [
    { department: "IT", allocated: 85, available: 45 },
    { department: "HR", allocated: 25, available: 30 },
    { department: "Finance", allocated: 40, available: 25 },
    { department: "Marketing", allocated: 35, available: 20 },
    { department: "Operations", allocated: 50, available: 30 },
  ],
  maintenanceByCategory: [
    { category: "Electronics", count: 45 },
    { category: "Vehicles", count: 12 },
    { category: "Furniture", count: 8 },
    { category: "Office Equipment", count: 15 },
  ],
  bookingHeatmap: [
    { day: "Mon", bookings: 12 },
    { day: "Tue", bookings: 18 },
    { day: "Wed", bookings: 15 },
    { day: "Thu", bookings: 20 },
    { day: "Fri", bookings: 14 },
    { day: "Sat", bookings: 4 },
    { day: "Sun", bookings: 2 },
  ]
};

const mockKPIs = {
  totalAssets: 2847,
  allocated: 1234,
  available: 1013,
  underMaintenance: 47,
  totalBookings: 342,
  maintenanceRequests: 156,
  resolvedRequests: 128,
  pendingRequests: 28,
  averageUtilization: 78,
  totalDepartments: 5,
  totalEmployees: 47,
  totalCategories: 4,
};

export default function ReportsPage() {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState("overview");
  const [dateRange, setDateRange] = useState("this-month");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [isChartDetailOpen, setIsChartDetailOpen] = useState(false);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const getTrendIcon = (value) => {
    if (value > 0) return <TrendingUp size={14} className="text-green-600" />;
    if (value < 0) return <TrendingDown size={14} className="text-red-600" />;
    return null;
  };

  const getTrendColor = (value) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-[#5F5E5A]";
  };

  // Simple bar chart component
  const BarChart = ({ data, height = 150, color = "brand" }) => {
    const max = Math.max(...data.map(d => d.value || d.count || d.assets || d.bookings || 0));
    const colors = {
      brand: "bg-brand-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      amber: "bg-amber-500",
      purple: "bg-purple-500",
      red: "bg-red-500",
    };

    return (
      <div className="flex items-end gap-1 h-[150px]">
        {data.map((item, index) => {
          const value = item.value || item.count || item.assets || item.bookings || 0;
          const heightPercent = max > 0 ? (value / max) * 100 : 0;
          const label = item.month || item.name || item.time || item.department || item.category || item.day || "";
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full ${colors[color] || colors.brand} rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer`}
                style={{ height: `${Math.max(heightPercent, 5)}%` }}
                onClick={() => {
                  setSelectedChart({ data: item, label });
                  setIsChartDetailOpen(true);
                }}
              />
              <span className="text-[8px] text-[#5F5E5A] mt-1 truncate w-full text-center">
                {label.length > 4 ? label.slice(0, 4) : label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // Department bar chart (stacked)
  const DepartmentBarChart = ({ data }) => {
    const max = Math.max(...data.map(d => d.allocated + d.available));

    return (
      <div className="flex items-end gap-3 h-[150px]">
        {data.map((item, index) => {
          const total = item.allocated + item.available;
          const heightPercent = max > 0 ? (total / max) * 100 : 0;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center gap-0.5">
                <div 
                  className="w-full bg-brand-500 rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{ height: `${Math.max((item.allocated / max) * 100, 2)}%` }}
                />
                <div 
                  className="w-full bg-brand-200 rounded-b transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{ height: `${Math.max((item.available / max) * 100, 2)}%` }}
                />
              </div>
              <span className="text-[8px] text-[#5F5E5A] mt-1 truncate w-full text-center">
                {item.department.slice(0, 4)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AppShell title="Reports & Analytics">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Reports & Analytics</h2>
        <p className="text-[#5F5E5A] mt-1">
          Get actionable insights from your asset and resource data
        </p>
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-brand-100 mb-6">
        <div className="flex gap-1 overflow-x-auto">
          <button
            onClick={() => setSelectedReport("overview")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              selectedReport === "overview"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <Activity size={18} />
            Overview
          </button>
          <button
            onClick={() => setSelectedReport("utilization")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              selectedReport === "utilization"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <TrendingUp size={18} />
            Utilization
          </button>
          <button
            onClick={() => setSelectedReport("maintenance")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              selectedReport === "maintenance"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <Wrench size={18} />
            Maintenance
          </button>
          <button
            onClick={() => setSelectedReport("bookings")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              selectedReport === "bookings"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <Calendar size={18} />
            Bookings
          </button>
        </div>
      </div>

      {/* Date Range & Export */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
          </select>
          <button className="p-2.5 rounded-xl border border-brand-100 hover:bg-brand-50 transition-colors">
            <RefreshCw size={18} className="text-[#5F5E5A]" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
            <BarChart3 size={16} />
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-brand-100 p-4 hover:shadow-md transition-shadow">
          <p className="text-xs text-[#5F5E5A]">Total Assets</p>
          <p className="mt-1 text-2xl font-bold text-brand-800">{formatNumber(mockKPIs.totalAssets)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={12} className="text-green-600" />
            <span className="text-xs text-green-600">+12%</span>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <p className="text-xs text-blue-700">Allocated</p>
          <p className="mt-1 text-2xl font-bold text-blue-700">{formatNumber(mockKPIs.allocated)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={12} className="text-blue-600" />
            <span className="text-xs text-blue-600">+8%</span>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <p className="text-xs text-green-700">Available</p>
          <p className="mt-1 text-2xl font-bold text-green-700">{formatNumber(mockKPIs.available)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown size={12} className="text-green-600" />
            <span className="text-xs text-green-600">-3%</span>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
          <p className="text-xs text-amber-700">Under Maintenance</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{mockKPIs.underMaintenance}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={12} className="text-amber-600" />
            <span className="text-xs text-amber-600">+5%</span>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl border border-purple-200 p-4">
          <p className="text-xs text-purple-700">Total Bookings</p>
          <p className="mt-1 text-2xl font-bold text-purple-700">{formatNumber(mockKPIs.totalBookings)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={12} className="text-purple-600" />
            <span className="text-xs text-purple-600">+15%</span>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <p className="text-xs text-red-700">Pending Requests</p>
          <p className="mt-1 text-2xl font-bold text-red-700">{mockKPIs.pendingRequests}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown size={12} className="text-red-600" />
            <span className="text-xs text-red-600">-2%</span>
          </div>
        </div>
      </div>

      {/* Content based on selected report */}
      <div>
        {/* OVERVIEW TAB */}
        {selectedReport === "overview" && (
          <>
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl border border-brand-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-800">Asset Utilization Trend</h3>
                    <p className="text-xs text-[#5F5E5A]">Monthly asset allocation trend</p>
                  </div>
                  <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                    View Details
                  </button>
                </div>
                <BarChart data={mockChartData.utilization} color="brand" />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-[#5F5E5A]">Jan - Dec 2026</span>
                  <span className="text-xs font-medium text-brand-600">Avg: 235 assets/month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-brand-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-800">Maintenance Requests</h3>
                    <p className="text-xs text-[#5F5E5A]">Monthly maintenance trends</p>
                  </div>
                  <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                    View Details
                  </button>
                </div>
                <BarChart data={mockChartData.maintenance} color="amber" />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-[#5F5E5A]">Jan - Dec 2026</span>
                  <span className="text-xs font-medium text-amber-600">Total: 156 requests</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-brand-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-800">Booking Activity</h3>
                    <p className="text-xs text-[#5F5E5A]">Peak usage hours</p>
                  </div>
                  <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                    View Details
                  </button>
                </div>
                <BarChart data={mockChartData.bookings} color="blue" />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-[#5F5E5A]">Peak hours: 10 AM - 4 PM</span>
                  <span className="text-xs font-medium text-blue-600">Total: 342 bookings</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-brand-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-800">Assets by Category</h3>
                    <p className="text-xs text-[#5F5E5A]">Distribution across categories</p>
                  </div>
                  <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                    View Details
                  </button>
                </div>
                <div className="space-y-3">
                  {mockChartData.categories.map((cat, index) => {
                    const percentage = (cat.value / mockKPIs.totalAssets) * 100;
                    const colors = ["brand", "blue", "green", "amber", "purple"];
                    const colorClass = colors[index % colors.length];
                    
                    return (
                      <div key={cat.name}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#5F5E5A]">{cat.name}</span>
                          <span className="font-medium text-brand-800">{cat.value}</span>
                        </div>
                        <div className="mt-1 h-1.5 bg-brand-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 bg-${colorClass === "brand" ? "brand-500" : colorClass === "blue" ? "blue-500" : colorClass === "green" ? "green-500" : colorClass === "amber" ? "amber-500" : "purple-500"}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Department-wise Allocation</h3>
                  <p className="text-xs text-[#5F5E5A]">Assets allocated vs available per department</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View All
                </button>
              </div>
              <DepartmentBarChart data={mockChartData.departmentAllocation} />
              <div className="flex items-center justify-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-brand-500" />
                  <span className="text-xs text-[#5F5E5A]">Allocated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-brand-200" />
                  <span className="text-xs text-[#5F5E5A]">Available</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* UTILIZATION TAB */}
        {selectedReport === "utilization" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Asset Utilization Trend</h3>
                  <p className="text-xs text-[#5F5E5A]">Monthly asset allocation trend</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View Details
                </button>
              </div>
              <BarChart data={mockChartData.utilization} color="brand" />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[#5F5E5A]">Jan - Dec 2026</span>
                <span className="text-xs font-medium text-brand-600">Avg: 235 assets/month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Department-wise Utilization</h3>
                  <p className="text-xs text-[#5F5E5A]">Allocation by department</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View Details
                </button>
              </div>
              <DepartmentBarChart data={mockChartData.departmentAllocation} />
              <div className="flex items-center justify-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-brand-500" />
                  <span className="text-xs text-[#5F5E5A]">Allocated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-brand-200" />
                  <span className="text-xs text-[#5F5E5A]">Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Assets by Category</h3>
                  <p className="text-xs text-[#5F5E5A]">Distribution across categories</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View Details
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {mockChartData.categories.map((cat, index) => {
                  const percentage = (cat.value / mockKPIs.totalAssets) * 100;
                  const colors = ["brand", "blue", "green", "amber", "purple"];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <div key={cat.name} className="bg-brand-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-brand-800">{cat.name}</span>
                        <span className="text-lg font-bold text-brand-600">{cat.value}</span>
                      </div>
                      <div className="mt-2 h-2 bg-brand-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 bg-${colorClass === "brand" ? "brand-500" : colorClass === "blue" ? "blue-500" : colorClass === "green" ? "green-500" : colorClass === "amber" ? "amber-500" : "purple-500"}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-[#5F5E5A] mt-1">{percentage.toFixed(1)}% of total</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MAINTENANCE TAB */}
        {selectedReport === "maintenance" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Maintenance Requests</h3>
                  <p className="text-xs text-[#5F5E5A]">Monthly maintenance trends</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View Details
                </button>
              </div>
              <BarChart data={mockChartData.maintenance} color="amber" />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[#5F5E5A]">Jan - Dec 2026</span>
                <span className="text-xs font-medium text-amber-600">Total: 156 requests</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Maintenance by Category</h3>
                  <p className="text-xs text-[#5F5E5A]">Most maintenance-prone categories</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View Details
                </button>
              </div>
              <BarChart data={mockChartData.maintenanceByCategory} color="red" />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[#5F5E5A]">Electronics lead with 45 requests</span>
                <span className="text-xs font-medium text-red-600">Total: 80 requests</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Maintenance Summary</h3>
                  <p className="text-xs text-[#5F5E5A]">Overview of maintenance activity</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-brand-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-brand-800">{mockKPIs.maintenanceRequests}</p>
                  <p className="text-xs text-[#5F5E5A]">Total Requests</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-700">{mockKPIs.resolvedRequests}</p>
                  <p className="text-xs text-[#5F5E5A]">Resolved</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber-700">{mockKPIs.pendingRequests}</p>
                  <p className="text-xs text-[#5F5E5A]">Pending</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-700">
                    {Math.round((mockKPIs.resolvedRequests / mockKPIs.maintenanceRequests) * 100)}%
                  </p>
                  <p className="text-xs text-[#5F5E5A]">Resolution Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {selectedReport === "bookings" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Booking Activity</h3>
                  <p className="text-xs text-[#5F5E5A]">Peak usage hours</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View Details
                </button>
              </div>
              <BarChart data={mockChartData.bookings} color="blue" />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[#5F5E5A]">Peak hours: 10 AM - 4 PM</span>
                <span className="text-xs font-medium text-blue-600">Total: 342 bookings</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Weekly Booking Heatmap</h3>
                  <p className="text-xs text-[#5F5E5A]">Bookings by day of week</p>
                </div>
                <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                  View Details
                </button>
              </div>
              <BarChart data={mockChartData.bookingHeatmap} color="purple" />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[#5F5E5A]">Thursday is the busiest</span>
                <span className="text-xs font-medium text-purple-600">20 bookings</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-800">Booking Summary</h3>
                  <p className="text-xs text-[#5F5E5A]">Overview of resource utilization</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-brand-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-brand-800">{mockKPIs.totalBookings}</p>
                  <p className="text-xs text-[#5F5E5A]">Total Bookings</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-700">85%</p>
                  <p className="text-xs text-[#5F5E5A]">Utilization Rate</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-700">23</p>
                  <p className="text-xs text-[#5F5E5A]">Active Bookings</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber-700">12</p>
                  <p className="text-xs text-[#5F5E5A]">Upcoming Bookings</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[420px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-800">Export Report</h3>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
              >
                <X size={20} className="text-[#5F5E5A]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Export Format</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                  <option>PDF Document</option>
                  <option>CSV Spreadsheet</option>
                  <option>Excel (.xlsx)</option>
                  <option>JSON Data</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Report Type</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                  <option>Full Report</option>
                  <option>Summary Only</option>
                  <option>Charts Only</option>
                  <option>Data Tables Only</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-100">
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <Download size={16} className="inline mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart Detail Modal */}
      {isChartDetailOpen && selectedChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[400px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-800">Chart Detail</h3>
              <button
                onClick={() => {
                  setIsChartDetailOpen(false);
                  setSelectedChart(null);
                }}
                className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
              >
                <X size={20} className="text-[#5F5E5A]" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-brand-50 rounded-xl p-4">
                <p className="text-xs text-[#5F5E5A]">Label</p>
                <p className="text-lg font-semibold text-brand-800">{selectedChart.label}</p>
              </div>
              <div className="bg-brand-50 rounded-xl p-4">
                <p className="text-xs text-[#5F5E5A]">Value</p>
                <p className="text-2xl font-bold text-brand-800">{selectedChart.data.value || selectedChart.data.count || selectedChart.data.assets || selectedChart.data.bookings || 0}</p>
              </div>
              {selectedChart.data.department && (
                <div className="bg-brand-50 rounded-xl p-4">
                  <p className="text-xs text-[#5F5E5A]">Allocation Breakdown</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-xs text-[#5F5E5A]">Allocated</p>
                      <p className="text-lg font-semibold text-brand-800">{selectedChart.data.allocated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#5F5E5A]">Available</p>
                      <p className="text-lg font-semibold text-brand-800">{selectedChart.data.available}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}