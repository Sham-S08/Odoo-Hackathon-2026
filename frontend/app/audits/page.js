"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  ClipboardCheck,
  Search,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Building2,
  Package,
  Eye,
  X,
  ChevronRight,
  ChevronDown,
  Send,
  Check,
  Download,
  Printer,
  MoreVertical,
  AlertTriangle,
  CheckCheck,
  UserCheck,
  Users,
  FileText,
  Flag,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Edit2,
  Trash2
} from "lucide-react";

// Mock data
const mockAuditCycles = [
  {
    id: 1,
    name: "Q3 2026 IT Asset Audit",
    scope: "IT Department",
    dateRange: { start: "2026-07-01", end: "2026-07-15" },
    auditors: ["Priya Sharma", "Raj Patel"],
    totalAssets: 45,
    verified: 38,
    missing: 4,
    damaged: 3,
    status: "In Progress",
    createdAt: "2026-06-25",
    completedAt: null,
    notes: "Focus on laptop inventory and peripherals"
  },
  {
    id: 2,
    name: "Finance Department Audit",
    scope: "Finance Department",
    dateRange: { start: "2026-06-15", end: "2026-06-30" },
    auditors: ["Ananya Reddy", "Vikram Singh"],
    totalAssets: 18,
    verified: 16,
    missing: 1,
    damaged: 1,
    status: "Completed",
    createdAt: "2026-06-10",
    completedAt: "2026-06-30",
    notes: "All assets verified and reconciled"
  },
  {
    id: 3,
    name: "Marketing Equipment Audit",
    scope: "Marketing Department",
    dateRange: { start: "2026-07-10", end: "2026-07-25" },
    auditors: ["Neha Gupta"],
    totalAssets: 22,
    verified: 0,
    missing: 0,
    damaged: 0,
    status: "Scheduled",
    createdAt: "2026-07-05",
    completedAt: null,
    notes: "Pending start"
  },
  {
    id: 4,
    name: "Operations Vehicle Audit",
    scope: "Operations Department - Vehicles",
    dateRange: { start: "2026-06-01", end: "2026-06-15" },
    auditors: ["Amit Kumar", "Sneha Reddy"],
    totalAssets: 8,
    verified: 6,
    missing: 0,
    damaged: 2,
    status: "Completed",
    createdAt: "2026-05-25",
    completedAt: "2026-06-15",
    notes: "Vehicles need maintenance follow-up"
  }
];

const mockAuditDetails = {
  1: [
    { id: 1, asset: "MacBook Pro 16\"", tag: "AF-0001", status: "Verified", condition: "Good", notes: "Working fine" },
    { id: 2, asset: "Dell XPS 15", tag: "AF-0002", status: "Verified", condition: "Good", notes: "Good condition" },
    { id: 3, asset: "Conference Room B2", tag: "AF-0003", status: "Damaged", condition: "Poor", notes: "Projector not working" },
    { id: 4, asset: "Toyota Innova", tag: "AF-0004", status: "Missing", condition: "Unknown", notes: "Not found in garage" },
    { id: 5, asset: "HP LaserJet Pro", tag: "AF-0005", status: "Verified", condition: "Good", notes: "Working" },
    { id: 6, asset: "iPhone 15 Pro", tag: "AF-0006", status: "Verified", condition: "Excellent", notes: "New" },
    { id: 7, asset: "Office Desk - Large", tag: "AF-0007", status: "Damaged", condition: "Poor", notes: "Table broken" },
    { id: 8, asset: "Bose Headphones", tag: "AF-0008", status: "Missing", condition: "Unknown", notes: "Missing" },
  ],
  2: [
    { id: 1, asset: "Office Chair", tag: "AF-0010", status: "Verified", condition: "Good", notes: "Good condition" },
    { id: 2, asset: "Financial Printer", tag: "AF-0011", status: "Verified", condition: "Good", notes: "Working" },
    { id: 3, asset: "Monitor", tag: "AF-0012", status: "Missing", condition: "Unknown", notes: "Not found" },
  ],
  4: [
    { id: 1, asset: "Toyota Innova", tag: "AF-0004", status: "Damaged", condition: "Fair", notes: "AC issue" },
    { id: 2, asset: "Hyundai Creta", tag: "AF-0009", status: "Verified", condition: "Good", notes: "Good condition" },
  ]
};

const statusColors = {
  Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
  Verified: "bg-green-50 text-green-700 border-green-200",
  Missing: "bg-red-50 text-red-700 border-red-200",
  Damaged: "bg-orange-50 text-orange-700 border-orange-200",
};

const statusIcons = {
  Scheduled: <Clock size={12} />,
  "In Progress": <RefreshCw size={12} />,
  Completed: <CheckCircle size={12} />,
  Verified: <CheckCircle size={12} />,
  Missing: <AlertCircle size={12} />,
  Damaged: <AlertTriangle size={12} />,
};

export default function AuditsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.Scheduled}`}>
        {statusIcons[status] || statusIcons.Scheduled}
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

  const getProgressPercentage = (audit) => {
    if (audit.totalAssets === 0) return 0;
    return Math.round((audit.verified / audit.totalAssets) * 100);
  };

  // Filter audits
  const filteredAudits = mockAuditCycles.filter(audit => {
    const matchesSearch = 
      audit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.scope.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.auditors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === "All" || audit.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const auditDetails = selectedAudit ? mockAuditDetails[selectedAudit.id] || [] : [];

  return (
    <AppShell title="Asset Audit">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Asset Audit Management</h2>
        <p className="text-[#5F5E5A] mt-1">
          Create and manage audit cycles to verify asset integrity across departments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-brand-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#5F5E5A]">Total Audits</p>
            <ClipboardCheck size={16} className="text-brand-400" />
          </div>
          <p className="mt-1 text-2xl font-bold text-brand-800">{mockAuditCycles.length}</p>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-blue-700">In Progress</p>
            <RefreshCw size={16} className="text-blue-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-blue-700">
            {mockAuditCycles.filter(a => a.status === "In Progress").length}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-green-700">Completed</p>
            <CheckCheck size={16} className="text-green-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-green-700">
            {mockAuditCycles.filter(a => a.status === "Completed").length}
          </p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-red-700">Discrepancies</p>
            <AlertTriangle size={16} className="text-red-600" />
          </div>
          <p className="mt-1 text-2xl font-bold text-red-700">
            {mockAuditCycles.reduce((sum, a) => sum + a.missing + a.damaged, 0)}
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder="Search audits by name, scope, or auditor..."
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
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Create Audit
          </button>
        </div>
      </div>

      {/* Audit Cards */}
      <div className="grid lg:grid-cols-2 gap-4">
        {filteredAudits.map((audit) => (
          <div 
            key={audit.id}
            className="bg-white rounded-xl border border-brand-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            onClick={() => {
              setSelectedAudit(audit);
              setIsDetailOpen(true);
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-brand-800">{audit.name}</h3>
                <p className="text-sm text-[#5F5E5A]">{audit.scope}</p>
              </div>
              {getStatusBadge(audit.status)}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#5F5E5A]" />
                <span className="text-xs text-[#5F5E5A]">
                  {formatDate(audit.dateRange.start)} - {formatDate(audit.dateRange.end)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#5F5E5A]" />
                <span className="text-xs text-[#5F5E5A]">
                  {audit.auditors.join(", ")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Package size={14} className="text-[#5F5E5A]" />
                <span className="text-xs font-medium text-brand-800">{audit.totalAssets}</span>
                <span className="text-xs text-[#5F5E5A]">Total</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                <span className="text-xs font-medium text-green-700">{audit.verified}</span>
                <span className="text-xs text-[#5F5E5A]">Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle size={14} className="text-red-500" />
                <span className="text-xs font-medium text-red-700">{audit.missing + audit.damaged}</span>
                <span className="text-xs text-[#5F5E5A]">Issues</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-brand-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(audit)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-brand-600">
                {getProgressPercentage(audit)}%
              </span>
            </div>

            {audit.status === "Completed" && audit.completedAt && (
              <div className="mt-3 text-xs text-[#5F5E5A]">
                Completed on {formatDate(audit.completedAt)}
              </div>
            )}
          </div>
        ))}
        {filteredAudits.length === 0 && (
          <div className="col-span-full px-6 py-12 text-center text-[#5F5E5A]">
            <ClipboardCheck size={48} className="mx-auto text-brand-200 mb-4" />
            <p className="text-lg font-medium text-brand-800">No audit cycles found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Audit Detail Modal */}
      {isDetailOpen && selectedAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[700px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <ClipboardCheck size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-800">{selectedAudit.name}</h3>
                    <p className="text-sm text-[#5F5E5A]">{selectedAudit.scope}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsDetailOpen(false);
                    setSelectedAudit(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Audit Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Status</p>
                  {getStatusBadge(selectedAudit.status)}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Date Range</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Calendar size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatDate(selectedAudit.dateRange.start)} - {formatDate(selectedAudit.dateRange.end)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Auditors</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedAudit.auditors.map((auditor, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-50 text-xs text-brand-600 border border-brand-100">
                        <UserCheck size={12} />
                        {auditor}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Created</p>
                  <p className="text-sm font-medium text-brand-800">{formatDate(selectedAudit.createdAt)}</p>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-brand-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-brand-800">{selectedAudit.totalAssets}</p>
                  <p className="text-[10px] text-[#5F5E5A]">Total</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-green-700">{selectedAudit.verified}</p>
                  <p className="text-[10px] text-[#5F5E5A]">Verified</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-red-700">{selectedAudit.missing}</p>
                  <p className="text-[10px] text-[#5F5E5A]">Missing</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-orange-700">{selectedAudit.damaged}</p>
                  <p className="text-[10px] text-[#5F5E5A]">Damaged</p>
                </div>
              </div>

              {/* Asset List */}
              {auditDetails.length > 0 && (
                <div className="border-t border-brand-100 pt-4">
                  <h4 className="text-sm font-semibold text-brand-800 mb-3">Asset Verification List</h4>
                  <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-brand-50/50">
                        <tr>
                          <th className="px-4 py-2 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Asset</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Tag</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Condition</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-100">
                        {auditDetails.map((item) => (
                          <tr key={item.id} className="hover:bg-brand-50/30 transition-colors">
                            <td className="px-4 py-2 font-medium text-brand-800">{item.asset}</td>
                            <td className="px-4 py-2 text-xs font-mono text-[#5F5E5A]">{item.tag}</td>
                            <td className="px-4 py-2">{getStatusBadge(item.status)}</td>
                            <td className="px-4 py-2 text-[#5F5E5A]">{item.condition}</td>
                            <td className="px-4 py-2 text-xs text-[#5F5E5A] max-w-[150px] truncate">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedAudit.notes && (
                <div className="border-t border-brand-100 pt-4 mt-4">
                  <h4 className="text-sm font-semibold text-brand-800 mb-2">Notes</h4>
                  <p className="text-sm text-[#5F5E5A]">{selectedAudit.notes}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                {selectedAudit.status === "Scheduled" && (
                  <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                    <RefreshCw size={16} className="inline mr-2" />
                    Start Audit
                  </button>
                )}
                {selectedAudit.status === "In Progress" && (
                  <>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                      <CheckCheck size={16} className="inline mr-2" />
                      Complete Audit
                    </button>
                    <button className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors">
                      <FileText size={16} className="inline mr-2" />
                      Generate Report
                    </button>
                  </>
                )}
                {selectedAudit.status === "Completed" && (
                  <>
                    <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                      <Download size={16} className="inline mr-2" />
                      Download Report
                    </button>
                    <button className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors">
                      <Printer size={16} className="inline mr-2" />
                      Print
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Audit Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-800">Create Audit Cycle</h3>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Audit Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Scope (Department/Location)</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Start Date</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">End Date</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Assign Auditors</label>
                  <select multiple className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm min-h-[100px]">
                    <option>Priya Sharma</option>
                    <option>Raj Patel</option>
                    <option>Ananya Reddy</option>
                    <option>Vikram Singh</option>
                    <option>Neha Gupta</option>
                    <option>Amit Kumar</option>
                    <option>Sneha Reddy</option>
                  </select>
                  <p className="text-[10px] text-[#5F5E5A] mt-1">Hold Ctrl/Cmd to select multiple auditors</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Additional Notes</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <ClipboardCheck size={16} className="inline mr-2" />
                  Create Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}