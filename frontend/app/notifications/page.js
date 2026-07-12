"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  Bell,
  Search,
  Filter,
  CheckCheck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Package,
  UserCheck,
  Wrench,
  Calendar,
  RefreshCw,
  ArrowRight,
  Eye,
  X,
  MoreVertical,
  ChevronDown,
  Settings,
  Users,
  Building2,
  FileText,
  Send,
  Mail
} from "lucide-react";

// Mock notifications data with role-based access
const mockNotifications = [
  {
    id: 1,
    type: "allocation",
    title: "Asset Allocated",
    message: "Laptop AF-0114 has been allocated to Priya Sharma",
    timestamp: "2026-07-13T09:30:00",
    read: false,
    priority: "high",
    actions: ["View Details", "Acknowledge"],
    roles: ["Admin", "Asset Manager", "Department Head", "Employee"],
  },
  {
    id: 2,
    type: "maintenance",
    title: "Maintenance Request Approved",
    message: "Maintenance request #MR-0042 for MacBook Pro has been approved",
    timestamp: "2026-07-13T08:15:00",
    read: false,
    priority: "medium",
    actions: ["View Request", "Track Progress"],
    roles: ["Admin", "Asset Manager", "Employee"],
  },
  {
    id: 3,
    type: "booking",
    title: "Booking Confirmed",
    message: "Conference Room B2 has been booked for 10:00 AM - 11:30 AM",
    timestamp: "2026-07-12T16:45:00",
    read: false,
    priority: "low",
    actions: ["View Booking", "Reschedule"],
    roles: ["Admin", "Asset Manager", "Department Head", "Employee"],
  },
  {
    id: 4,
    type: "transfer",
    title: "Transfer Request Pending",
    message: "Transfer request #TR-0018 for Dell XPS 15 needs your approval",
    timestamp: "2026-07-12T14:20:00",
    read: true,
    priority: "high",
    actions: ["Approve", "Reject", "View Details"],
    roles: ["Admin", "Asset Manager"],
  },
  {
    id: 5,
    type: "overdue",
    title: "Overdue Return Alert",
    message: "Toyota Innova (AF-0004) is overdue for return by 3 days",
    timestamp: "2026-07-12T10:00:00",
    read: true,
    priority: "high",
    actions: ["View Asset", "Send Reminder"],
    roles: ["Admin", "Asset Manager", "Department Head"],
  },
  {
    id: 6,
    type: "audit",
    title: "Audit Discrepancy Flagged",
    message: "Audit cycle #A-2026-03 found 3 missing assets in IT department",
    timestamp: "2026-07-11T11:30:00",
    read: true,
    priority: "medium",
    actions: ["View Report", "Resolve"],
    roles: ["Admin", "Asset Manager"],
  },
  {
    id: 7,
    type: "maintenance",
    title: "Maintenance Request Raised",
    message: "HP LaserJet Pro requires immediate maintenance - paper jam issue",
    timestamp: "2026-07-11T09:15:00",
    read: true,
    priority: "low",
    actions: ["View Request", "Assign Technician"],
    roles: ["Admin", "Asset Manager"],
  },
  {
    id: 8,
    type: "booking",
    title: "Booking Reminder",
    message: "Reminder: Training Room C1 booked at 2:00 PM today",
    timestamp: "2026-07-11T08:00:00",
    read: true,
    priority: "low",
    actions: ["View Booking", "Cancel"],
    roles: ["Admin", "Asset Manager", "Department Head", "Employee"],
  },
];

// Activity logs
const mockActivityLogs = [
  { id: 1, user: "Priya Sharma", action: "Registered new asset: MacBook Pro", timestamp: "2026-07-13T10:30:00", module: "Assets" },
  { id: 2, user: "Raj Patel", action: "Approved maintenance request #MR-0042", timestamp: "2026-07-13T09:15:00", module: "Maintenance" },
  { id: 3, user: "Ananya Reddy", action: "Created audit cycle #A-2026-04", timestamp: "2026-07-13T08:45:00", module: "Audit" },
  { id: 4, user: "Admin", action: "Promoted Vikram Singh to Department Head", timestamp: "2026-07-12T17:00:00", module: "Organization" },
  { id: 5, user: "Neha Gupta", action: "Booked Conference Room A3", timestamp: "2026-07-12T16:20:00", module: "Bookings" },
  { id: 6, user: "Amit Kumar", action: "Requested transfer of Dell XPS 15", timestamp: "2026-07-12T14:00:00", module: "Allocation" },
  { id: 7, user: "Sneha Reddy", action: "Returned HP LaserJet Pro from maintenance", timestamp: "2026-07-12T11:30:00", module: "Maintenance" },
];

const notificationTypes = ["All", "allocation", "maintenance", "booking", "transfer", "overdue", "audit"];

const typeColors = {
  allocation: "bg-blue-50 text-blue-700 border-blue-200",
  maintenance: "bg-amber-50 text-amber-700 border-amber-200",
  booking: "bg-green-50 text-green-700 border-green-200",
  transfer: "bg-purple-50 text-purple-700 border-purple-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
  audit: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const typeIcons = {
  allocation: <UserCheck size={14} />,
  maintenance: <Wrench size={14} />,
  booking: <Calendar size={14} />,
  transfer: <RefreshCw size={14} />,
  overdue: <AlertCircle size={14} />,
  audit: <FileText size={14} />,
};

const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("notifications");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTypeBadge = (type) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${typeColors[type] || typeColors.allocation}`}>
        {typeIcons[type] || typeIcons.allocation}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Filter notifications based on user role
  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = 
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All" || n.type === selectedType;
    
    // Role-based filtering
    const userRole = user?.role || "Employee";
    const hasAccess = n.roles.includes(userRole) || n.roles.includes("All");
    
    return matchesSearch && matchesType && hasAccess;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const activityLogs = mockActivityLogs;

  return (
    <AppShell title="Notifications">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Notifications</h2>
        <p className="text-[#5F5E5A] mt-1">
          Stay updated with your asset and resource activities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-brand-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#5F5E5A]">Total</p>
            <Bell size={16} className="text-brand-400" />
          </div>
          <p className="mt-1 text-2xl font-bold text-brand-800">{notifications.length}</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-red-700">Unread</p>
            <AlertCircle size={16} className="text-red-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-red-700">{unreadCount}</p>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-blue-700">High Priority</p>
            <AlertCircle size={16} className="text-blue-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-blue-700">
            {notifications.filter(n => n.priority === "high").length}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-green-700">Resolved</p>
            <CheckCircle size={16} className="text-green-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-green-700">
            {notifications.filter(n => n.read).length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-100 mb-6">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "notifications"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <Bell size={18} />
            Notifications
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-medium">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "activity"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <RefreshCw size={18} />
            Activity Logs
          </button>
        </div>
      </div>

      {activeTab === "notifications" && (
        <>
          {/* Search & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
              >
                {notificationTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <button 
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
              >
                <CheckCheck size={16} />
                Mark All Read
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`bg-white rounded-xl border p-4 transition-all hover:shadow-md cursor-pointer ${
                  notification.read ? "border-brand-100" : "border-brand-300 bg-brand-50/30"
                }`}
                onClick={() => {
                  setSelectedNotification(notification);
                  setIsDetailOpen(true);
                  if (!notification.read) markAsRead(notification.id);
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[notification.type] || typeColors.allocation}`}>
                      {typeIcons[notification.type] || typeIcons.allocation}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-medium ${notification.read ? "text-[#5F5E5A]" : "text-brand-800"}`}>
                        {notification.title}
                      </p>
                      {getTypeBadge(notification.type)}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${priorityColors[notification.priority]}`}>
                        {notification.priority}
                      </span>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-[#5F5E5A] mt-1">{notification.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-[#5F5E5A]">{formatTime(notification.timestamp)}</span>
                      <span className="text-xs text-[#5F5E5A]">•</span>
                      <span className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                        {notification.actions.join(" • ")}
                      </span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 p-1.5 rounded-lg hover:bg-brand-100 transition-colors">
                    <ChevronDown size={16} className="text-[#5F5E5A]" />
                  </button>
                </div>
              </div>
            ))}
            {filteredNotifications.length === 0 && (
              <div className="px-6 py-12 text-center text-[#5F5E5A]">
                <Bell size={48} className="mx-auto text-brand-200 mb-4" />
                <p className="text-lg font-medium text-brand-800">No notifications</p>
                <p className="text-sm mt-1">You're all caught up!</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "activity" && (
        <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Module</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-brand-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-brand-50 flex items-center justify-center text-xs font-medium text-brand-600">
                        {log.user.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-[#5F5E5A]">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{log.action}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-600 border border-brand-100">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{formatTime(log.timestamp)}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors">
                      <Eye size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Notification Detail Modal */}
      {isDetailOpen && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[480px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[selectedNotification.type] || typeColors.allocation}`}>
                  {typeIcons[selectedNotification.type] || typeIcons.allocation}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-800">{selectedNotification.title}</h3>
                  <p className="text-xs text-[#5F5E5A]">{formatDateTime(selectedNotification.timestamp)}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDetailOpen(false);
                  setSelectedNotification(null);
                }}
                className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
              >
                <X size={20} className="text-[#5F5E5A]" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-brand-50 rounded-xl p-4">
                <p className="text-sm text-[#1A1730]">{selectedNotification.message}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {getTypeBadge(selectedNotification.type)}
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[selectedNotification.priority]}`}>
                  {selectedNotification.priority} priority
                </span>
              </div>
              <div className="border-t border-brand-100 pt-4">
                <p className="text-xs font-medium text-[#5F5E5A] mb-2">Available Actions</p>
                <div className="flex flex-wrap gap-2">
                  {selectedNotification.actions.map((action) => (
                    <button key={action} className="px-4 py-2 rounded-lg bg-brand-50 text-brand-600 text-sm font-medium hover:bg-brand-100 transition-colors">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}