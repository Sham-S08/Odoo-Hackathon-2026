"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { 
  User,
  Settings,
  Mail,
  Phone,
  Lock,
  Bell,
  Moon,
  Sun,
  Shield,
  LogOut,
  Save,
  Edit2,
  X,
  Check,
  Eye,
  EyeOff,
  Camera,
  Building2,
  MapPin,
  Key,
  Clock
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Priya Sharma",
    email: user?.email || "priya@company.com",
    phone: "+91 98765 43210",
    department: "IT",
    role: user?.role || "Admin",
    location: "Mumbai, India",
    bio: "Enterprise Asset Management Professional with 8+ years of experience.",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    language: "English",
    timezone: "IST (UTC+5:30)",
  });

  const [profileImage, setProfileImage] = useState(null);

  const updateForm = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const updatePassword = (field) => (e) => {
    setPasswordData({ ...passwordData, [field]: e.target.value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleChangePassword = () => {
    // Password change logic here
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppShell title="Profile & Settings">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-800">Profile & Settings</h2>
        <p className="text-[#5F5E5A] mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-100 mb-6">
        <div className="flex gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "profile"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <User size={18} />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "security"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <Lock size={18} />
            Security
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "preferences"
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-[#5F5E5A] hover:text-brand-600 hover:border-brand-300"
            }`}
          >
            <Settings size={18} />
            Preferences
          </button>
        </div>
      </div>

      {activeTab === "profile" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-brand-100 p-6 text-center">
              <div className="relative inline-block">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-3xl font-bold text-white mx-auto shadow-lg shadow-brand-500/25 overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    formData.name.split(" ").map(n => n[0]).join("")
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors cursor-pointer shadow-md">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-800">{formData.name}</h3>
              <p className="text-sm text-[#5F5E5A]">{formData.role}</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  formData.role === "Admin" ? "bg-purple-50 text-purple-700" :
                  formData.role === "Asset Manager" ? "bg-blue-50 text-blue-700" :
                  "bg-brand-50 text-brand-700"
                }`}>
                  {formData.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  Active
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-brand-100 space-y-2 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-[#5F5E5A]" />
                  <span className="text-[#5F5E5A]">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-[#5F5E5A]" />
                  <span className="text-[#5F5E5A]">{formData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 size={16} className="text-[#5F5E5A]" />
                  <span className="text-[#5F5E5A]">{formData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-[#5F5E5A]" />
                  <span className="text-[#5F5E5A]">{formData.location}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-brand-800">Personal Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-50 text-brand-600 text-sm font-medium hover:bg-brand-100 transition-colors"
                >
                  {isEditing ? <X size={16} /> : <Edit2 size={16} />}
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {isEditing ? (
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={updateForm("name")}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={updateForm("email")}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={updateForm("phone")}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Department</label>
                      <select
                        value={formData.department}
                        onChange={updateForm("department")}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                      >
                        <option>IT</option>
                        <option>HR</option>
                        <option>Finance</option>
                        <option>Marketing</option>
                        <option>Operations</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={updateForm("location")}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={updateForm("bio")}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-brand-100">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-brand-100 text-sm text-[#5F5E5A] hover:bg-brand-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
                    >
                      <Save size={16} className="inline mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#5F5E5A]">Full Name</p>
                      <p className="text-sm font-medium text-brand-800 mt-1">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#5F5E5A]">Email</p>
                      <p className="text-sm font-medium text-brand-800 mt-1">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#5F5E5A]">Phone</p>
                      <p className="text-sm font-medium text-brand-800 mt-1">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#5F5E5A]">Department</p>
                      <p className="text-sm font-medium text-brand-800 mt-1">{formData.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#5F5E5A]">Location</p>
                      <p className="text-sm font-medium text-brand-800 mt-1">{formData.location}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-[#5F5E5A]">Bio</p>
                      <p className="text-sm text-[#5F5E5A] mt-1">{formData.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password */}
          <div className="bg-white rounded-xl border border-brand-100 p-6">
            <h3 className="text-base font-semibold text-brand-800 mb-4">Change Password</h3>
            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Current Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.current}
                    onChange={updatePassword("current")}
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F5E5A] hover:text-brand-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">New Password</label>
                <div className="relative">
                  <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={updatePassword("new")}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Check size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={updatePassword("confirm")}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleChangePassword}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
              >
                <Lock size={16} className="inline mr-2" />
                Update Password
              </button>
            </form>
          </div>

          {/* Security Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-800">Two-Factor Authentication</h4>
                  <p className="text-xs text-[#5F5E5A]">Add an extra layer of security</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5F5E5A]">Status: Disabled</span>
                <button className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors">
                  Enable
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-brand-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-800">Session Management</h4>
                  <p className="text-xs text-[#5F5E5A]">Active sessions across devices</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5F5E5A]">Current Session</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5F5E5A]">Chrome on Windows</span>
                  <span className="text-[#5F5E5A]">2 days ago</span>
                </div>
                <button className="text-xs text-red-600 hover:text-red-700 transition-colors">
                  Logout all other sessions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-xl border border-brand-100 p-6">
            <h3 className="text-base font-semibold text-brand-800 mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-800">Push Notifications</p>
                  <p className="text-xs text-[#5F5E5A]">Receive real-time notifications in-app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-brand-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-800">Email Alerts</p>
                  <p className="text-xs text-[#5F5E5A]">Receive email notifications for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailAlerts}
                    onChange={() => setPreferences({ ...preferences, emailAlerts: !preferences.emailAlerts })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-brand-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-xl border border-brand-100 p-6">
            <h3 className="text-base font-semibold text-brand-800 mb-4">Appearance</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Theme</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPreferences({ ...preferences, darkMode: false })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      !preferences.darkMode
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-brand-100 text-[#5F5E5A] hover:bg-brand-50"
                    }`}
                  >
                    <Sun size={16} />
                    Light
                  </button>
                  <button
                    onClick={() => setPreferences({ ...preferences, darkMode: true })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      preferences.darkMode
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-brand-100 text-[#5F5E5A] hover:bg-brand-50"
                    }`}
                  >
                    <Moon size={16} />
                    Dark
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                >
                  <option>IST (UTC+5:30)</option>
                  <option>EST (UTC-5:00)</option>
                  <option>PST (UTC-8:00)</option>
                  <option>GMT (UTC+0:00)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}