"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/layout/AppShell";
import { 
  Building2, 
  Users, 
  Tag, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle,
  UserPlus,
  X,
  FolderTree,
} from "lucide-react";

// Mock data
const initialDepartments = [
  { id: 1, name: "Information Technology", head: "Priya Sharma", parent: null, employees: 45, status: "Active" },
  { id: 2, name: "Human Resources", head: "Raj Patel", parent: null, employees: 12, status: "Active" },
  { id: 3, name: "Finance", head: "Ananya Reddy", parent: null, employees: 18, status: "Active" },
  { id: 4, name: "Marketing", head: "Vikram Singh", parent: null, employees: 22, status: "Active" },
  { id: 5, name: "Operations", head: "Neha Gupta", parent: null, employees: 30, status: "Inactive" },
];

const initialEmployees = [
  { id: 1, name: "Priya Sharma", email: "priya@company.com", department: "IT", role: "Admin", status: "Active" },
  { id: 2, name: "Raj Patel", email: "raj@company.com", department: "HR", role: "Department Head", status: "Active" },
  { id: 3, name: "Ananya Reddy", email: "ananya@company.com", department: "Finance", role: "Asset Manager", status: "Active" },
  { id: 4, name: "Vikram Singh", email: "vikram@company.com", department: "Marketing", role: "Employee", status: "Active" },
  { id: 5, name: "Neha Gupta", email: "neha@company.com", department: "Operations", role: "Employee", status: "Inactive" },
  { id: 6, name: "Amit Kumar", email: "amit@company.com", department: "IT", role: "Employee", status: "Active" },
  { id: 7, name: "Sneha Reddy", email: "sneha@company.com", department: "Finance", role: "Employee", status: "Active" },
];

const initialCategories = [
  { id: 1, name: "Electronics", fields: ["Warranty Period", "Power Rating"], assetCount: 342, status: "Active" },
  { id: 2, name: "Furniture", fields: ["Material", "Dimensions"], assetCount: 156, status: "Active" },
  { id: 3, name: "Vehicles", fields: ["License Plate", "Mileage"], assetCount: 23, status: "Active" },
  { id: 4, name: "Office Equipment", fields: ["Serial Number", "Model"], assetCount: 89, status: "Inactive" },
];

const TABS = [
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "employees", label: "Employees", icon: Users },
  { id: "categories", label: "Categories", icon: Tag },
];

export default function OrganizationPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("departments");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [departments, setDepartments] = useState(initialDepartments);
  const [employees, setEmployees] = useState(initialEmployees);
  const [categories, setCategories] = useState(initialCategories);

  const getStatusBadge = (status) => {
    const styles = {
      Active: "bg-green-50 text-green-700 border-green-200",
      Inactive: "bg-red-50 text-red-700 border-red-200",
    };
    const icons = {
      Active: <CheckCircle size={12} />,
      Inactive: <XCircle size={12} />,
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.Active}`}>
        {icons[status] || icons.Active}
        {status}
      </span>
    );
  };

  // Filter functions
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete handlers
  const handleDelete = (type, id) => {
    if (confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      if (type === "departments") {
        setDepartments(departments.filter(d => d.id !== id));
      } else if (type === "employees") {
        setEmployees(employees.filter(e => e.id !== id));
      } else if (type === "categories") {
        setCategories(categories.filter(c => c.id !== id));
      }
    }
  };

  // Edit handler - opens modal with data
  const handleEdit = (type, item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const renderDepartments = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder="Search departments by name or head..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
          />
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Add Department
        </button>
      </div>

      <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Head</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Parent</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Employees</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept) => (
                <tr key={dept.id} className="hover:bg-brand-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-800">{dept.name}</td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{dept.head}</td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{dept.parent || "—"}</td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{dept.employees}</td>
                  <td className="px-6 py-4">{getStatusBadge(dept.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit("departments", dept)}
                        className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                      >
                        <Edit2 size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete("departments", dept.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} className="text-[#5F5E5A] hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-[#5F5E5A]">
                  No departments found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder="Search employees by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
          />
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
        >
          <UserPlus size={16} />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-brand-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-800">{emp.name}</td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{emp.email}</td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{emp.department}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      emp.role === "Admin" ? "bg-purple-50 text-purple-700 border-purple-200" :
                      emp.role === "Department Head" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      emp.role === "Asset Manager" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      "bg-brand-50 text-brand-700 border-brand-200"
                    }`}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(emp.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit("employees", emp)}
                        className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                      >
                        <Edit2 size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete("employees", emp.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} className="text-[#5F5E5A] hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-[#5F5E5A]">
                  No employees found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
          <input
            type="text"
            placeholder="Search categories by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
          />
        </div>
        <button 
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-brand-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Custom Fields</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Assets</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-brand-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-800">{cat.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {cat.fields.map((field) => (
                        <span key={field} className="px-2 py-0.5 rounded bg-brand-50 text-xs text-brand-600 border border-brand-100">
                          {field}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#5F5E5A]">{cat.assetCount}</td>
                  <td className="px-6 py-4">{getStatusBadge(cat.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit("categories", cat)}
                        className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                      >
                        <Edit2 size={16} className="text-[#5F5E5A] hover:text-brand-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete("categories", cat.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} className="text-[#5F5E5A] hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-[#5F5E5A]">
                  No categories found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AppShell title="Organization Setup">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Organization Setup</h2>
        <p className="text-[#5F5E5A] mt-1">
          Manage departments, employees, and asset categories
        </p>
      </div>

      <div className="border-b border-brand-100 mb-6">
        <div className="flex gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm("");
                }}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all ${
                  isActive
                    ? "border-brand-500 text-brand-700"
                    : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {activeTab === "departments" && renderDepartments()}
        {activeTab === "employees" && renderEmployees()}
        {activeTab === "categories" && renderCategories()}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25 backdrop-blur-sm">
          <div className="w-[520px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-800">
                {editingItem ? "Edit" : "Add"} {activeTab === "departments" ? "Department" : activeTab === "employees" ? "Employee" : "Category"}
              </h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-brand-100 transition-colors"
              >
                <X size={20} className="text-[#5F5E5A]" />
              </button>
            </div>

            <form className="space-y-4">
              {activeTab === "departments" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Department Name</label>
                    <input 
                      type="text" 
                      defaultValue={editingItem?.name || ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Department Head</label>
                    <select 
                      defaultValue={editingItem?.head || ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    >
                      <option value="">Select Head</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.name}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Parent Department</label>
                    <select 
                      defaultValue={editingItem?.parent || ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    >
                      <option value="">None</option>
                      {departments.filter(d => d.id !== editingItem?.id).map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Status</label>
                    <select 
                      defaultValue={editingItem?.status || "Active"}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === "employees" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={editingItem?.name || ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Email</label>
                    <input 
                      type="email" 
                      defaultValue={editingItem?.email || ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Department</label>
                    <select 
                      defaultValue={editingItem?.department || ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    >
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Role</label>
                    <select 
                      defaultValue={editingItem?.role || "Employee"}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    >
                      <option>Employee</option>
                      <option>Department Head</option>
                      <option>Asset Manager</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Status</label>
                    <select 
                      defaultValue={editingItem?.status || "Active"}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === "categories" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Category Name</label>
                    <input 
                      type="text" 
                      defaultValue={editingItem?.name || ""}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Custom Fields (comma separated)</label>
                    <input 
                      type="text" 
                      defaultValue={editingItem?.fields?.join(", ") || ""}
                      placeholder="e.g. Warranty Period, Power Rating"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Status</label>
                    <select 
                      defaultValue={editingItem?.status || "Active"}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-brand-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
                >
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}