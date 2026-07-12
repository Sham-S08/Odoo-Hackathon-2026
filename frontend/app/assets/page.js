"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  Package, 
  Search, 
  Plus, 
  Grid3x3, 
  List, 
  Filter,
  ChevronDown,
  ChevronRight,
  Calendar,
  User,
  MapPin,
  Tag,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  Trash2,
  Eye,
  Edit2,
  QrCode,
  Download,
  X
} from "lucide-react";

// Mock data
const mockAssets = [
  { 
    id: 1, 
    name: "MacBook Pro 16\"", 
    tag: "AF-0001", 
    serial: "MBP-2024-001",
    category: "Electronics", 
    status: "Available",
    location: "IT Office - Floor 3",
    condition: "Good",
    assignedTo: null,
    acquisitionDate: "2024-01-15",
    cost: 2499,
    isShared: false,
    image: null
  },
  { 
    id: 2, 
    name: "Dell XPS 15", 
    tag: "AF-0002", 
    serial: "DXP-2024-002",
    category: "Electronics", 
    status: "Allocated",
    location: "Marketing Dept",
    condition: "Excellent",
    assignedTo: "Priya Sharma",
    acquisitionDate: "2024-02-01",
    cost: 1899,
    isShared: false,
    image: null
  },
  { 
    id: 3, 
    name: "Conference Room B2", 
    tag: "AF-0003", 
    serial: "CR-2024-003",
    category: "Furniture", 
    status: "Reserved",
    location: "Floor 2 - East Wing",
    condition: "Good",
    assignedTo: "Marketing Team",
    acquisitionDate: "2023-06-10",
    cost: 15000,
    isShared: true,
    image: null
  },
  { 
    id: 4, 
    name: "Toyota Innova", 
    tag: "AF-0004", 
    serial: "VH-2024-004",
    category: "Vehicles", 
    status: "Under Maintenance",
    location: "Garage - Bay 2",
    condition: "Fair",
    assignedTo: null,
    acquisitionDate: "2023-09-20",
    cost: 45000,
    isShared: true,
    image: null
  },
  { 
    id: 5, 
    name: "HP LaserJet Pro", 
    tag: "AF-0005", 
    serial: "HP-2024-005",
    category: "Office Equipment", 
    status: "Available",
    location: "HR Office",
    condition: "Good",
    assignedTo: null,
    acquisitionDate: "2024-03-05",
    cost: 599,
    isShared: true,
    image: null
  },
  { 
    id: 6, 
    name: "iPhone 15 Pro", 
    tag: "AF-0006", 
    serial: "IP-2024-006",
    category: "Electronics", 
    status: "Allocated",
    location: "Sales Dept",
    condition: "Excellent",
    assignedTo: "Raj Patel",
    acquisitionDate: "2024-04-01",
    cost: 1199,
    isShared: false,
    image: null
  },
  { 
    id: 7, 
    name: "Office Desk - Large", 
    tag: "AF-0007", 
    serial: "OD-2024-007",
    category: "Furniture", 
    status: "Retired",
    location: "Storage - Warehouse",
    condition: "Poor",
    assignedTo: null,
    acquisitionDate: "2020-01-15",
    cost: 800,
    isShared: false,
    image: null
  },
  { 
    id: 8, 
    name: "Bose Headphones", 
    tag: "AF-0008", 
    serial: "BH-2024-008",
    category: "Electronics", 
    status: "Lost",
    location: "Unknown",
    condition: "Poor",
    assignedTo: "Amit Kumar",
    acquisitionDate: "2024-02-15",
    cost: 299,
    isShared: false,
    image: null
  },
];

const statusColors = {
  Available: "bg-green-50 text-green-700 border-green-200",
  Allocated: "bg-blue-50 text-blue-700 border-blue-200",
  Reserved: "bg-amber-50 text-amber-700 border-amber-200",
  "Under Maintenance": "bg-orange-50 text-orange-700 border-orange-200",
  Lost: "bg-red-50 text-red-700 border-red-200",
  Retired: "bg-gray-50 text-gray-700 border-gray-200",
  Disposed: "bg-gray-50 text-gray-700 border-gray-200",
};

const statusIcons = {
  Available: <CheckCircle size={12} />,
  Allocated: <User size={12} />,
  Reserved: <Clock size={12} />,
  "Under Maintenance": <Wrench size={12} />,
  Lost: <AlertCircle size={12} />,
  Retired: <Trash2 size={12} />,
  Disposed: <X size={12} />,
};

const categories = ["All", "Electronics", "Furniture", "Vehicles", "Office Equipment"];

export default function AssetsPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState("table"); // table | grid
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Filter assets
  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.assignedTo && asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || asset.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || asset.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.Available}`}>
        {statusIcons[status] || statusIcons.Available}
        {status}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AppShell title="Assets">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Asset Directory</h2>
        <p className="text-[#5F5E5A] mt-1">
          Register, track, and manage all organizational assets
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder="Search by name, tag, serial, or assignee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "table" ? "bg-brand-50 text-brand-600" : "text-[#5F5E5A] hover:bg-brand-50"}`}
          >
            <List size={20} />
          </button>
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-brand-50 text-brand-600" : "text-[#5F5E5A] hover:bg-brand-50"}`}
          >
            <Grid3x3 size={20} />
          </button>
          <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Register Asset
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#5F5E5A]" />
          <span className="text-sm text-[#5F5E5A]">Filters:</span>
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-brand-100 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Allocated">Allocated</option>
          <option value="Reserved">Reserved</option>
          <option value="Under Maintenance">Under Maintenance</option>
          <option value="Lost">Lost</option>
          <option value="Retired">Retired</option>
          <option value="Disposed">Disposed</option>
        </select>
        {(selectedCategory !== "All" || selectedStatus !== "All") && (
          <button 
            onClick={() => {
              setSelectedCategory("All");
              setSelectedStatus("All");
            }}
            className="text-xs text-brand-500 hover:text-brand-600 transition-colors"
          >
            Clear filters
          </button>
        )}
        <span className="text-xs text-[#5F5E5A] ml-auto">
          {filteredAssets.length} assets found
        </span>
      </div>

      {/* Asset List / Grid */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Asset</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Tag</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-brand-50/30 transition-colors cursor-pointer" onClick={() => {
                  setSelectedAsset(asset);
                  setIsPreviewOpen(true);
                }}>
                  <td className="px-6 py-4 font-medium text-brand-800">{asset.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-50 text-xs font-mono text-brand-600">
                      <QrCode size={10} />
                      {asset.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{asset.category}</td>
                  <td className="px-6 py-4">{getStatusBadge(asset.status)}</td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{asset.location}</td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{asset.assignedTo || "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAsset(asset);
                          setIsPreviewOpen(true);
                        }}
                        className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                      >
                        <Eye size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors">
                        <Edit2 size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <div className="px-6 py-12 text-center text-[#5F5E5A]">
              <Package size={48} className="mx-auto text-brand-200 mb-4" />
              <p className="text-lg font-medium text-brand-800">No assets found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div 
              key={asset.id}
              className="bg-white rounded-xl border border-brand-100 p-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => {
                setSelectedAsset(asset);
                setIsPreviewOpen(true);
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-brand-800 text-sm">{asset.name}</p>
                  <p className="text-xs text-[#5F5E5A] font-mono">{asset.tag}</p>
                </div>
                <div className="flex items-center gap-1">
                  {asset.isShared && (
                    <span className="px-1.5 py-0.5 rounded bg-brand-50 text-[8px] font-medium text-brand-600 border border-brand-100">
                      Shared
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5F5E5A]">Category</span>
                  <span className="text-xs font-medium text-brand-800">{asset.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5F5E5A]">Status</span>
                  {getStatusBadge(asset.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5F5E5A]">Location</span>
                  <span className="text-xs text-brand-800">{asset.location}</span>
                </div>
                {asset.assignedTo && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#5F5E5A]">Assigned To</span>
                    <span className="text-xs font-medium text-brand-800">{asset.assignedTo}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-brand-100 flex items-center justify-between">
                <span className="text-xs text-[#5F5E5A]">Acquired: {formatDate(asset.acquisitionDate)}</span>
                <span className="text-xs font-medium text-brand-800">{formatCurrency(asset.cost)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Preview Panel */}
      {isPreviewOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[600px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <Package size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-800">{selectedAsset.name}</h3>
                    <p className="text-sm text-[#5F5E5A] font-mono">{selectedAsset.tag}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsPreviewOpen(false);
                    setSelectedAsset(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Serial Number</p>
                  <p className="text-sm font-medium text-brand-800">{selectedAsset.serial}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Category</p>
                  <p className="text-sm font-medium text-brand-800">{selectedAsset.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Status</p>
                  <div>{getStatusBadge(selectedAsset.status)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Condition</p>
                  <p className="text-sm font-medium text-brand-800">{selectedAsset.condition}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Location</p>
                  <p className="text-sm font-medium text-brand-800">
                    <MapPin size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {selectedAsset.location}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Assigned To</p>
                  <p className="text-sm font-medium text-brand-800">
                    {selectedAsset.assignedTo ? (
                      <>
                        <User size={14} className="inline mr-1 text-[#5F5E5A]" />
                        {selectedAsset.assignedTo}
                      </>
                    ) : "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Acquisition Date</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Calendar size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatDate(selectedAsset.acquisitionDate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F5E5A]">Cost</p>
                  <p className="text-sm font-medium text-brand-800">
                    <Tag size={14} className="inline mr-1 text-[#5F5E5A]" />
                    {formatCurrency(selectedAsset.cost)}
                  </p>
                </div>
              </div>

              {/* Asset History Timeline */}
              <div className="border-t border-brand-100 pt-4">
                <h4 className="text-sm font-semibold text-brand-800 mb-4">Asset History</h4>
                <div className="space-y-3">
                  {[
                    { event: "Asset registered", date: "2024-01-15", user: "Admin" },
                    { event: "Allocated to Priya Sharma", date: "2024-02-01", user: "Asset Manager" },
                    { event: "Returned from Priya Sharma", date: "2024-03-01", user: "Asset Manager" },
                    { event: "Maintenance completed", date: "2024-03-15", user: "Technician" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-brand-400 mt-1.5" />
                        {index < 3 && <div className="absolute top-4 left-1/2 w-0.5 h-8 bg-brand-200" />}
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
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  <Edit2 size={16} className="inline mr-2" />
                  Edit Asset
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors">
                  <Download size={16} />
                  QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Asset Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[560px] max-w-[90vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-800">Register New Asset</h3>
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <X size={20} className="text-[#5F5E5A]" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Asset Name</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Category</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm">
                      <option>Electronics</option>
                      <option>Furniture</option>
                      <option>Vehicles</option>
                      <option>Office Equipment</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Serial Number</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
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
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Location</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Acquisition Date</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Acquisition Cost</label>
                    <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-[#5F5E5A]">
                    <input type="checkbox" className="rounded border-brand-200 text-brand-500 focus:ring-brand-200" />
                    Mark as shared/bookable resource
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Notes / Documents</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                  Register Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}