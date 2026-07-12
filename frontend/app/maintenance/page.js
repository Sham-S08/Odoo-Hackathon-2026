"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  Wrench,
  Search,
  Plus,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Package,
  Calendar,
  MessageSquare,
  Image,
  Edit2,
  Trash2,
  Eye,
  X,
  ChevronRight,
  ChevronDown,
  Send,
  Check,
  RefreshCw,
  Download,
  Printer,
  MoreVertical,
  Flag,
  AlertTriangle,
  CheckCheck,
  ClipboardCheck,
  UserCheck,
  Phone,
  Mail,
  Building2,
  Tag,
  Bot,
  Activity,
  HeartPulse,
  TrendingUp,
  TrendingDown,
  Shield
} from "lucide-react";

// Mock data - updated with "Retire" recommendation
const mockMaintenanceRequests = [
  {
    id: 1,
    asset: "MacBook Pro 16\"",
    assetTag: "AF-0001",
    assetId: 1,
    raisedBy: "Priya Sharma",
    department: "IT",
    priority: "High",
    status: "Pending",
    description: "Screen flickering and random shutdowns. Need immediate attention.",
    attachments: ["screen-issue.jpg"],
    raisedDate: "2026-07-12",
    approvedDate: null,
    technicianAssigned: null,
    resolvedDate: null,
    notes: "Critical for development work",
    aiInsight: {
      recommendation: "Repair",
      healthScore: 45,
      reason: "Multiple critical issues detected. Immediate repair recommended to prevent complete failure."
    }
  },
  {
    id: 2,
    asset: "Toyota Innova",
    assetTag: "AF-0004",
    assetId: 4,
    raisedBy: "Neha Gupta",
    department: "Operations",
    priority: "Medium",
    status: "Approved",
    description: "AC not cooling properly. Engine making unusual noise.",
    attachments: ["engine-noise.mp3"],
    raisedDate: "2026-07-11",
    approvedDate: "2026-07-12",
    technicianAssigned: "Rajesh Kumar",
    resolvedDate: null,
    notes: "Vehicle needs to be ready for client visit",
    aiInsight: {
      recommendation: "Retire",
      healthScore: 68,
      reason: "AC system needs servicing. Engine noise suggests belt replacement. Schedule maintenance."
    }
  },
  {
    id: 3,
    asset: "HP LaserJet Pro",
    assetTag: "AF-0005",
    assetId: 5,
    raisedBy: "Sneha Reddy",
    department: "Finance",
    priority: "Low",
    status: "Technician Assigned",
    description: "Paper jam frequently. Printing quality is poor.",
    attachments: ["sample-print.jpg"],
    raisedDate: "2026-07-10",
    approvedDate: "2026-07-11",
    technicianAssigned: "Vikram Singh",
    resolvedDate: null,
    notes: "Replace toner and check rollers",
    aiInsight: {
      recommendation: "Monitor",
      healthScore: 72,
      reason: "Good condition with limited maintenance history. Routine maintenance recommended."
    }
  },
  {
    id: 4,
    asset: "Digital Whiteboard",
    assetTag: "AF-0005",
    assetId: 5,
    raisedBy: "Vikram Singh",
    department: "HR",
    priority: "Medium",
    status: "In Progress",
    description: "Touch not responsive. Display calibration issues.",
    attachments: [],
    raisedDate: "2026-07-09",
    approvedDate: "2026-07-10",
    technicianAssigned: "Priya Patel",
    resolvedDate: null,
    notes: "Calibration needed",
    aiInsight: {
      recommendation: "Repair",
      healthScore: 55,
      reason: "Touch calibration issues indicate hardware degradation. Professional repair recommended."
    }
  },
  {
    id: 5,
    asset: "Dell XPS 15",
    assetTag: "AF-0002",
    assetId: 2,
    raisedBy: "Raj Patel",
    department: "Marketing",
    priority: "High",
    status: "Resolved",
    description: "Battery draining quickly. Overheating issues.",
    attachments: ["battery-report.pdf"],
    raisedDate: "2026-07-08",
    approvedDate: "2026-07-09",
    technicianAssigned: "Amit Kumar",
    resolvedDate: "2026-07-11",
    notes: "Battery replaced. Issue resolved.",
    aiInsight: {
      recommendation: "Monitor",
      healthScore: 85,
      reason: "Battery replaced successfully. Monitor for any recurring issues."
    }
  },
  {
    id: 6,
    asset: "Conference Room B2",
    assetTag: "AF-0003",
    assetId: 3,
    raisedBy: "Ananya Reddy",
    department: "Finance",
    priority: "Low",
    status: "Rejected",
    description: "Projector not connecting to laptop. HDMI port issue.",
    attachments: [],
    raisedDate: "2026-07-07",
    approvedDate: null,
    technicianAssigned: null,
    resolvedDate: null,
    notes: "Rejected - Need to check with IT team first",
    aiInsight: null
  }
];

const priorityColors = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-green-50 text-green-700 border-green-200",
};

const priorityIcons = {
  High: <AlertCircle size={12} />,
  Medium: <AlertTriangle size={12} />,
  Low: <CheckCircle size={12} />,
};

const statusColors = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-blue-50 text-blue-700 border-blue-200",
  "Technician Assigned": "bg-purple-50 text-purple-700 border-purple-200",
  "In Progress": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Resolved: "bg-green-50 text-green-700 border-green-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const statusIcons = {
  Pending: <Clock size={12} />,
  Approved: <CheckCircle size={12} />,
  "Technician Assigned": <UserCheck size={12} />,
  "In Progress": <RefreshCw size={12} />,
  Resolved: <CheckCheck size={12} />,
  Rejected: <XCircle size={12} />,
};

const statusOrder = ["Pending", "Approved", "Technician Assigned", "In Progress", "Resolved"];

// AI Insight Card Component
// AI Insight Card Component
const AIInsightCard = ({ insight }) => {
  if (!insight) return null;

  const getHealthColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case "Repair":
        return <Wrench size={16} className="text-red-500" />;
      case "Retire":
        return <AlertTriangle size={16} className="text-gray-500" />;
      case "Monitor":
        return <HeartPulse size={16} className="text-green-500" />;
      default:
        return <Shield size={16} className="text-brand-500" />;
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case "Repair":
        return "bg-red-50 text-red-700 border-red-200";
      case "Retire":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "Monitor":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-brand-50 text-brand-700 border-brand-200";
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-50/80 via-white to-brand-50/50 rounded-xl border border-brand-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25">
          <Bot size={18} className="text-white" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-800">AI Maintenance Insight</h4>
          <p className="text-xs text-[#5F5E5A]">Powered by predictive analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Recommendation */}
        <div className="bg-white rounded-lg p-4 border border-brand-100">
          <p className="text-xs text-[#5F5E5A] mb-1">Recommendation</p>
          <div className="flex items-center gap-2">
            {getRecommendationIcon(insight.recommendation)}
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getRecommendationColor(insight.recommendation)}`}>
              {insight.recommendation}
            </span>
          </div>
        </div>

        {/* Health Score */}
        <div className="bg-white rounded-lg p-4 border border-brand-100">
          <p className="text-xs text-[#5F5E5A] mb-1">Health Score</p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-4 border-brand-100 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-brand-500" 
                  style={{ 
                    clipPath: `inset(0 ${100 - insight.healthScore}% 0 0)`,
                    borderColor: insight.healthScore >= 80 ? '#22c55e' : insight.healthScore >= 60 ? '#f59e0b' : '#ef4444'
                  }} 
                />
                <span className={`text-sm font-bold ${getHealthColor(insight.healthScore)}`}>
                  {insight.healthScore}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                {insight.healthScore >= 80 ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : insight.healthScore >= 60 ? (
                  <TrendingDown size={14} className="text-amber-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span className={`text-xs font-medium ${getHealthColor(insight.healthScore)}`}>
                  {insight.healthScore >= 80 ? "Good" : insight.healthScore >= 60 ? "Fair" : "Critical"}
                </span>
              </div>
              <p className="text-[10px] text-[#5F5E5A] mt-0.5">/ 100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reason */}
      <div className="mt-3 bg-white rounded-lg p-4 border border-brand-100">
        <p className="text-xs text-[#5F5E5A] mb-1">Reason</p>
        <p className="text-sm text-[#1A1730] leading-relaxed">{insight.reason}</p>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[10px] text-[#5F5E5A]">
        <Bot size={12} className="text-brand-400" />
        <span>AI-generated insight for reference only. Final decisions should be made by asset managers.</span>
      </div>
    </div>
  );
};

export default function MaintenancePage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getPriorityBadge = (priority) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[priority] || priorityColors.Medium}`}>
        {priorityIcons[priority] || priorityIcons.Medium}
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.Pending}`}>
        {statusIcons[status] || statusIcons.Pending}
        {status}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getWorkflowProgress = (status) => {
    const index = statusOrder.indexOf(status);
    if (status === "Rejected") return 0;
    return ((index + 1) / statusOrder.length) * 100;
  };

  const filteredRequests = mockMaintenanceRequests.filter(req => {
    const matchesSearch = 
      req.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.raisedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || req.status === selectedStatus;
    const matchesPriority = selectedPriority === "All" || req.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <AppShell title="Maintenance Management">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Maintenance Management</h2>
        <p className="text-[#5F5E5A] mt-1">
          Track and manage asset maintenance requests from submission to resolution
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-brand-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#5F5E5A]">Total Requests</p>
            <Wrench size={16} className="text-brand-400" />
          </div>
          <p className="mt-1 text-2xl font-bold text-brand-800">{mockMaintenanceRequests.length}</p>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-amber-700">Pending</p>
            <Clock size={16} className="text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-amber-700">
            {mockMaintenanceRequests.filter(r => r.status === "Pending").length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-blue-700">In Progress</p>
            <RefreshCw size={16} className="text-blue-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-blue-700">
            {mockMaintenanceRequests.filter(r => r.status === "In Progress" || r.status === "Technician Assigned").length}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-green-700">Resolved</p>
            <CheckCheck size={16} className="text-green-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-green-700">
            {mockMaintenanceRequests.filter(r => r.status === "Resolved").length}
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder="Search requests by asset, raised by, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Technician Assigned">Technician Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Raise Request
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Asset</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Raised By</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Raised Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Progress</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {filteredRequests.map((req) => (
              <tr 
                key={req.id} 
                className="hover:bg-brand-50/30 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedRequest(req);
                  setIsDetailOpen(true);
                }}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-brand-800">{req.asset}</p>
                    <p className="text-xs text-[#5F5E5A] font-mono">{req.assetTag}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-brand-50 flex items-center justify-center text-xs font-medium text-brand-600">
                      {req.raisedBy.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-[#5F5E5A]">{req.raisedBy}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{getPriorityBadge(req.priority)}</td>
                <td className="px-6 py-4">{getStatusBadge(req.status)}</td>
                <td className="px-6 py-4 text-[#5F5E5A]">{formatDate(req.raisedDate)}</td>
                <td className="px-6 py-4">
                  {req.status !== "Rejected" ? (
                    <div className="w-full max-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-brand-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-500 rounded-full transition-all duration-500"
                            style={{ width: `${getWorkflowProgress(req.status)}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#5F5E5A]">
                          {Math.round(getWorkflowProgress(req.status))}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-red-600">Rejected</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRequest(req);
                        setIsDetailOpen(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                    >
                      <Eye size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                    </button>
                    {req.status === "Pending" && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle approve
                        }}
                        className="p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <Check size={16} className="text-green-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="px-6 py-12 text-center text-[#5F5E5A]">
            <Wrench size={48} className="mx-auto text-brand-200 mb-4" />
            <p className="text-lg font-medium text-brand-800">No maintenance requests found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Request Detail Modal with AI Insight */}
      {isDetailOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[650px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <Wrench size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-800">Maintenance Request</h3>
                    <p className="text-sm text-[#5F5E5A]">#{selectedRequest.id} • {selectedRequest.asset}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsDetailOpen(false);
                    setSelectedRequest(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Status and Priority */}
              <div className="flex items-center gap-4 mb-4">
                {getStatusBadge(selectedRequest.status)}
                {getPriorityBadge(selectedRequest.priority)}
              </div>

              {/* AI Insight Card */}
              {selectedRequest.aiInsight && (
                <div className="mb-6">
                  <AIInsightCard insight={selectedRequest.aiInsight} />
                </div>
              )}

              {/* Asset Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Asset</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Package size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedRequest.asset}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Asset Tag</p>
                  <p className="text-sm font-medium text-brand-800 font-mono">{selectedRequest.assetTag}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Raised By</p>
                  <p className="text-sm font-medium text-brand-800">
                    <User size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedRequest.raisedBy}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Department</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Building2 size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedRequest.department}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Raised Date</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Calendar size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatDateTime(selectedRequest.raisedDate)}
                  </p>
                </div>
                {selectedRequest.approvedDate && (
                  <div className="space-y-1">
                    <p className="text-xs text-[#5F5E5A]">Approved Date</p>
                    <p className="text-sm font-medium text-brand-800">
                      <CheckCircle size={14} className="inline mr-1 text-green-600" />
                      {formatDateTime(selectedRequest.approvedDate)}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-brand-100 pt-4 mb-4">
                <h4 className="text-sm font-semibold text-brand-800 mb-2">Description</h4>
                <p className="text-sm text-[#5F5E5A]">{selectedRequest.description}</p>
              </div>

              {/* Notes */}
              {selectedRequest.notes && (
                <div className="border-t border-brand-100 pt-4 mb-4">
                  <h4 className="text-sm font-semibold text-brand-800 mb-2">Notes</h4>
                  <p className="text-sm text-[#5F5E5A]">{selectedRequest.notes}</p>
                </div>
              )}

              {/* Technician */}
              {selectedRequest.technicianAssigned && (
                <div className="border-t border-brand-100 pt-4 mb-4">
                  <h4 className="text-sm font-semibold text-brand-800 mb-2">Technician Assigned</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center text-xs font-medium text-brand-600">
                      {selectedRequest.technicianAssigned.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-brand-800">{selectedRequest.technicianAssigned}</span>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div className="border-t border-brand-100 pt-4">
                  <h4 className="text-sm font-semibold text-brand-800 mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-100">
                        <Image size={14} className="text-brand-400" />
                        <span className="text-xs text-brand-600">{file}</span>
                        <button className="text-brand-400 hover:text-brand-600">
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Workflow Progress */}
              {selectedRequest.status !== "Rejected" && (
                <div className="border-t border-brand-100 pt-4 mt-4">
                  <h4 className="text-sm font-semibold text-brand-800 mb-3">Workflow Progress</h4>
                  <div className="relative">
                    <div className="flex justify-between mb-2">
                      {statusOrder.map((status, index) => {
                        const isCompleted = statusOrder.indexOf(selectedRequest.status) >= index;
                        const isCurrent = status === selectedRequest.status;
                        return (
                          <div key={status} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted ? "bg-brand-500 text-white" : 
                              isCurrent ? "bg-brand-100 text-brand-500 border-2 border-brand-500" :
                              "bg-brand-50 text-[#5F5E5A]"
                            }`}>
                              {isCompleted ? <Check size={16} /> : <Clock size={16} />}
                            </div>
                            <span className={`text-[10px] mt-1 ${isCurrent ? "font-medium text-brand-600" : "text-[#5F5E5A]"}`}>
                              {status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-brand-100 -z-10">
                      <div 
                        className="h-full bg-brand-500 transition-all duration-500"
                        style={{ width: `${getWorkflowProgress(selectedRequest.status)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                {selectedRequest.status === "Pending" && (
                  <>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all hover:-translate-y-0.5">
                      <Check size={16} className="inline mr-2" />
                      Approve Request
                    </button>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors">
                      <X size={16} className="inline mr-2" />
                      Reject
                    </button>
                  </>
                )}
                {selectedRequest.status === "Approved" && (
                  <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                    <UserCheck size={16} className="inline mr-2" />
                    Assign Technician
                  </button>
                )}
                {selectedRequest.status === "Technician Assigned" && (
                  <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5">
                    <RefreshCw size={16} className="inline mr-2" />
                    Mark In Progress
                  </button>
                )}
                {selectedRequest.status === "In Progress" && (
                  <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all hover:-translate-y-0.5">
                    <CheckCheck size={16} className="inline mr-2" />
                    Mark Resolved
                  </button>
                )}
                <button className="px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Raise Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-800">Raise Maintenance Request</h3>
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Select Asset</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                    <option>MacBook Pro 16" (AF-0001)</option>
                    <option>Dell XPS 15 (AF-0002)</option>
                    <option>Toyota Innova (AF-0004)</option>
                    <option>HP LaserJet Pro (AF-0005)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Priority</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Issue Description</label>
                  <textarea rows={4} className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Additional Notes</label>
                  <textarea rows={2} className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Attachments</label>
                  <div className="border-2 border-dashed border-brand-200 rounded-xl p-6 text-center hover:border-brand-400 transition-colors cursor-pointer">
                    <Image size={24} className="mx-auto text-brand-300 mb-2" />
                    <p className="text-xs text-[#5F5E5A]">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-[#5F5E5A] mt-1">PNG, JPG, PDF up to 5MB</p>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <Send size={16} className="inline mr-2" />
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}