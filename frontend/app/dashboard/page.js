"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import KpiCard from "@/components/dashboard/KpiCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { 
  Package, 
  UserCheck, 
  Wrench, 
  Calendar, 
  AlertCircle,
  ArrowRight
} from "lucide-react";

// Mock data
const mockKpiData = {
  totalAssets: 2847,
  allocated: 1234,
  available: 1013,
  maintenanceToday: 47,
  activeBookings: 23,
  pendingTransfers: 12,
  upcomingReturns: 8,
  overdueReturns: 5,
};

const mockActivities = [
  { id: 1, message: "Laptop AF-0114 allocated to Priya Shah", time: "2 min ago" },
  { id: 2, message: "Maintenance request #MR-0042 approved", time: "15 min ago" },
  { id: 3, message: "Room B2 booked by Marketing team", time: "1 hour ago" },
  { id: 4, message: "Audit cycle #A-2026-03 completed", time: "3 hours ago" },
  { id: 5, message: "Transfer request #TR-0018 pending approval", time: "5 hours ago" },
];

const mockNotifications = [
  { id: 1, message: "5 assets are overdue for return", time: "10 min ago", isImportant: true },
  { id: 2, message: "Maintenance request #MR-0045 raised by John Doe", time: "30 min ago", isImportant: false },
  { id: 3, message: "Booking reminder: Room A3 at 2:30 PM today", time: "1 hour ago", isImportant: false },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-300 border-t-brand-600 mx-auto" />
          <p className="mt-4 text-sm text-[#5F5E5A]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppShell title="Dashboard">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">
          Welcome back, {user.name || "User"}!
        </h2>
        <p className="text-[#5F5E5A] mt-1">
          Here's what's happening with your assets today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <KpiCard label="Total Assets" value={mockKpiData.totalAssets} icon={Package} />
        <KpiCard label="Allocated" value={mockKpiData.allocated} icon={UserCheck} color="blue" />
        <KpiCard label="Available" value={mockKpiData.available} icon={Package} color="green" />
        <KpiCard label="Maintenance" value={mockKpiData.maintenanceToday} icon={Wrench} color="amber" />
        <KpiCard label="Active Bookings" value={mockKpiData.activeBookings} icon={Calendar} color="purple" />
        <KpiCard label="Overdue Returns" value={mockKpiData.overdueReturns} icon={AlertCircle} color="red" />
      </div>

      {/* Quick Actions & Alert */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-700">Overdue Returns Alert</p>
            <p className="text-xs text-red-600 mt-1">
              {mockKpiData.overdueReturns} assets are past their expected return date. 
              Please follow up with the assigned employees.
            </p>
            <Link 
              href="/allocations?filter=overdue"
              className="mt-2 inline-flex items-center text-xs font-medium text-red-700 hover:text-red-800 transition-colors"
            >
              View all 
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-brand-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-brand-800">Recent Activity</h3>
            <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
              View all
            </button>
          </div>
          <RecentActivity items={mockActivities} />
        </div>

        <div className="bg-white rounded-xl border border-brand-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-brand-800">Notifications</h3>
            <button className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
              Mark all read
            </button>
          </div>
          <div className="space-y-3">
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  notification.isImportant ? "bg-red-50 border border-red-200" : "bg-brand-50/50"
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  notification.isImportant ? "bg-red-500" : "bg-brand-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${notification.isImportant ? "text-red-700" : "text-[#1A1730]"}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-[#5F5E5A] mt-0.5">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}