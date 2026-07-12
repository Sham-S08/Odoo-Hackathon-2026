"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  ArrowLeftRight, 
  Search, 
  Plus, 
  Filter,
  User,
  Package,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Edit2,
  Trash2,
  Eye,
  Send,
  Check,
  X,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  FileText,
  MoreVertical,
  Download,
  Printer
} from "lucide-react";

// Mock data
const mockAllocations = [
  {
    id: 1,
    asset: "MacBook Pro 16\"",
    assetTag: "AF-0001",
    assetId: 1,
    employee: "Priya Sharma",
    employeeId: 1,
    department: "IT",
    allocatedDate: "2024-01-15",
    expectedReturn: "2024-07-15",
    actualReturn: null,
    status: "Active",
    condition: "Good",
    notes: "Work laptop for development"
  },
  {
    id: 2,
    asset: "Dell XPS 15",
    assetTag: "AF-0002",
    assetId: 2,
    employee: "Raj Patel",
    employeeId: 2,
    department: "Marketing",
    allocatedDate: "2024-02-01",
    expectedReturn: "2024-08-01",
    actualReturn: null,
    status: "Active",
    condition: "Excellent",
    notes: "Design work"
  },
  {
    id: 3,
    asset: "iPhone 15 Pro",
    assetTag: "AF-0006",
    assetId: 6,
    employee: "Amit Kumar",
    employeeId: 6,
    department: "Sales",
    allocatedDate: "2024-04-01",
    expectedReturn: "2024-06-01",
    actualReturn: "2024-06-05",
    status: "Returned",
    condition: "Excellent",
    notes: "Sales phone"
  },
  {
    id: 4,
    asset: "Toyota Innova",
    assetTag: "AF-0004",
    assetId: 4,
    employee: "Neha Gupta",
    employeeId: 5,
    department: "Operations",
    allocatedDate: "2024-03-15",
    expectedReturn: "2024-06-15",
    actualReturn: null,
    status: "Overdue",
    condition: "Fair",
    notes: "Transport for events"
  },
  {
    id: 5,
    asset: "HP LaserJet Pro",
    assetTag: "AF-0005",
    assetId: 5,
    employee: "Sneha Reddy",
    employeeId: 7,
    department: "Finance",
    allocatedDate: "2024-03-05",
    expectedReturn: "2024-09-05",
    actualReturn: null,
    status: "Active",
    condition: "Good",
    notes: "Finance department printer"
  }
];

const mockTransfers = [
  {
    id: 1,
    asset: "MacBook Pro 16\"",
    assetTag: "AF-0001",
    fromEmployee: "Priya Sharma",
    toEmployee: "Vikram Singh",
    requestDate: "2024-07-10",
    status: "Pending",
    reason: "Role change - Priya moving to different project",
    approver: null
  },
  {
    id: 2,
    asset: "Dell XPS 15",
    assetTag: "AF-0002",
    fromEmployee: "Raj Patel",
    toEmployee: "Ananya Reddy",
    requestDate: "2024-07-08",
    status: "Approved",
    reason: "Cross-functional team assignment",
    approver: "Admin"
  },
  {
    id: 3,
    asset: "iPhone 15 Pro",
    assetTag: "AF-0006",
    fromEmployee: "Amit Kumar",
    toEmployee: "Sneha Reddy",
    requestDate: "2024-07-05",
    status: "Rejected",
    reason: "Device needed for current project",
    approver: "Asset Manager"
  }
];

const statusColors = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Returned: "bg-blue-50 text-blue-700 border-blue-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Completed: "bg-gray-50 text-gray-700 border-gray-200"
};

const statusIcons = {
  Active: <CheckCircle size={12} />,
  Returned: <Check size={12} />,
  Overdue: <AlertCircle size={12} />,
  Pending: <Clock size={12} />,
  Approved: <CheckCircle size={12} />,
  Rejected: <XCircle size={12} />,
  Completed: <Check size={12} />
};

export default function AllocationsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("allocations");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.Active}`}>
        {statusIcons[status] || statusIcons.Active}
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

  const isOverdue = (expectedReturn) => {
    if (!expectedReturn) return false;
    return new Date(expectedReturn) < new Date();
  };

  // Filter allocations
  const filteredAllocations = mockAllocations.filter(alloc => {
    const matchesSearch = 
      alloc.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alloc.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alloc.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alloc.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || alloc.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter transfers
  const filteredTransfers = mockTransfers.filter(transfer => {
    const matchesSearch = 
      transfer.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.fromEmployee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.toEmployee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.assetTag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || transfer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell title="Allocation & Transfer">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Asset Allocation & Transfer</h2>
        <p className="text-[#5F5E5A] mt-1">
          Manage asset assignments, transfers, and returns
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-100 mb-6">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("allocations")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "allocations"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <UserCheck size={18} />
            Allocations
          </button>
          <button
            onClick={() => setActiveTab("transfers")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "transfers"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <RefreshCw size={18} />
            Transfers
          </button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder={`Search ${activeTab === "allocations" ? "allocations..." : "transfers..."}`}
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
            <option value="Active">Active</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button 
            onClick={() => setIsAllocateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Allocate Asset
          </button>
        </div>
      </div>

      {/* Allocations Tab */}
      {activeTab === "allocations" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Allocated</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Expected Return</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {filteredAllocations.map((alloc) => {
                  const overdue = isOverdue(alloc.expectedReturn) && alloc.status === "Active";
                  return (
                    <tr 
                      key={alloc.id} 
                      className={`hover:bg-brand-50/30 transition-colors cursor-pointer ${overdue ? "bg-red-50/30" : ""}`}
                      onClick={() => {
                        setSelectedAllocation(alloc);
                        setIsDetailOpen(true);
                      }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-brand-800">{alloc.asset}</p>
                          <p className="text-xs text-[#5F5E5A] font-mono">{alloc.assetTag}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-brand-50 flex items-center justify-center text-xs font-medium text-brand-600">
                            {alloc.employee.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="text-[#5F5E5A]">{alloc.employee}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#5F5E5A]">{alloc.department}</td>
                      <td className="px-6 py-4 text-[#5F5E5A]">{formatDate(alloc.allocatedDate)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#5F5E5A]" />
                          <span className={`${overdue ? "text-red-600 font-medium" : "text-[#5F5E5A]"}`}>
                            {formatDate(alloc.expectedReturn)}
                          </span>
                          {overdue && <AlertCircle size={14} className="text-red-500" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(alloc.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAllocation(alloc);
                              setIsDetailOpen(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                          >
                            <Eye size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsTransferModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                          >
                            <RefreshCw size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredAllocations.length === 0 && (
              <div className="px-6 py-12 text-center text-[#5F5E5A]">
                <ArrowLeftRight size={48} className="mx-auto text-brand-200 mb-4" />
                <p className="text-lg font-medium text-brand-800">No allocations found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transfers Tab */}
      {activeTab === "transfers" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">From → To</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Request Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-brand-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-brand-800">{transfer.asset}</p>
                        <p className="text-xs text-[#5F5E5A] font-mono">{transfer.assetTag}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#5F5E5A]">{transfer.fromEmployee}</span>
                        <ArrowRight size={14} className="text-brand-300" />
                        <span className="text-sm font-medium text-brand-800">{transfer.toEmployee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#5F5E5A]">{formatDate(transfer.requestDate)}</td>
                    <td className="px-6 py-4 text-[#5F5E5A] max-w-[200px] truncate">{transfer.reason}</td>
                    <td className="px-6 py-4">{getStatusBadge(transfer.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {transfer.status === "Pending" && (
                          <>
                            <button className="p-1.5 rounded-lg hover:bg-green-50 transition-colors">
                              <Check size={16} className="text-green-600" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                              <X size={16} className="text-red-600" />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors">
                          <Eye size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTransfers.length === 0 && (
              <div className="px-6 py-12 text-center text-[#5F5E5A]">
                <RefreshCw size={48} className="mx-auto text-brand-200 mb-4" />
                <p className="text-lg font-medium text-brand-800">No transfers found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Allocation Detail Modal */}
      {isDetailOpen && selectedAllocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <Package size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-800">Allocation Details</h3>
                    <p className="text-sm text-[#5F5E5A] font-mono">{selectedAllocation.assetTag}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsDetailOpen(false);
                    setSelectedAllocation(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Asset</p>
                  <p className="text-sm font-medium text-brand-800">{selectedAllocation.asset}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Status</p>
                  <div>{getStatusBadge(selectedAllocation.status)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Employee</p>
                  <p className="text-sm font-medium text-brand-800">
                    <User size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedAllocation.employee}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Department</p>
                  <p className="text-sm font-medium text-brand-800">{selectedAllocation.department}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Allocated Date</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Calendar size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatDate(selectedAllocation.allocatedDate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Expected Return</p>
                  <p className={`text-sm font-medium ${isOverdue(selectedAllocation.expectedReturn) && selectedAllocation.status === "Active" ? "text-red-600" : "text-brand-800"}`}>
                    <Calendar size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatDate(selectedAllocation.expectedReturn)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Condition</p>
                  <p className="text-sm font-medium text-brand-800">{selectedAllocation.condition}</p>
                </div>
                {selectedAllocation.actualReturn && (
                  <div className="space-y-1">
                    <p className="text-xs text-[#5F5E5A]">Actual Return</p>
                    <p className="text-sm font-medium text-brand-800">
                      <Check size={14} className="inline mr-1 text-green-600" />
                      {formatDate(selectedAllocation.actualReturn)}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-brand-100 pt-4">
                <h4 className="text-sm font-semibold text-brand-800 mb-3">Notes</h4>
                <p className="text-sm text-[#5F5E5A]">{selectedAllocation.notes || "No additional notes"}</p>
              </div>

              {/* Allocation History */}
              <div className="border-t border-brand-100 pt-4 mt-4">
                <h4 className="text-sm font-semibold text-brand-800 mb-3">Allocation History</h4>
                <div className="space-y-3">
                  {[
                    { event: "Asset allocated", date: selectedAllocation.allocatedDate, user: "Admin" },
                    { event: "Asset assigned to employee", date: selectedAllocation.allocatedDate, user: "Asset Manager" },
                    ...(selectedAllocation.actualReturn ? [
                      { event: "Asset returned", date: selectedAllocation.actualReturn, user: "Employee" }
                    ] : [])
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-brand-400 mt-1.5" />
                        {index < 1 && <div className="absolute top-4 left-1/2 w-0.5 h-8 bg-brand-200" />}
                      </div>
                      <div>
                        <p className="text-sm text-[#1A1730]">{item.event}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-[#5F5E5A]">{formatDate(item.date)}</span>
                          <span className="text-xs text-[#5F5E5A]">•</span>
                          <span className="text-xs text-[#5F5E5A]">by {item.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                {selectedAllocation.status === "Active" && (
                  <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all hover:-translate-y-0.5">
                    <Check size={16} className="inline mr-2" />
                    Mark as Returned
                  </button>
                )}
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <RefreshCw size={16} className="inline mr-2" />
                  Request Transfer
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allocate Asset Modal */}
      {isAllocateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-800">Allocate Asset</h3>
                <button
                  onClick={() => setIsAllocateModalOpen(false)}
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
                    <option>HP LaserJet Pro (AF-0005)</option>
                    <option>Office Desk - Large (AF-0007)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Select Employee</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                    <option>Priya Sharma - IT</option>
                    <option>Raj Patel - Marketing</option>
                    <option>Ananya Reddy - Finance</option>
                    <option>Vikram Singh - Marketing</option>
                    <option>Neha Gupta - Operations</option>
                    <option>Amit Kumar - Sales</option>
                    <option>Sneha Reddy - Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Expected Return Date</label>
                  <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Condition</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Notes</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAllocateModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <Send size={16} className="inline mr-2" />
                  Allocate Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-800">Request Transfer</h3>
                <button
                  onClick={() => setIsTransferModalOpen(false)}
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
                    <option>iPhone 15 Pro (AF-0006)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">From Employee</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                    <option>Priya Sharma - IT</option>
                    <option>Raj Patel - Marketing</option>
                    <option>Amit Kumar - Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">To Employee</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                    <option>Vikram Singh - Marketing</option>
                    <option>Ananya Reddy - Finance</option>
                    <option>Sneha Reddy - Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Reason for Transfer</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsTransferModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <Send size={16} className="inline mr-2" />
                  Submit Transfer Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}