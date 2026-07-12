"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Building2, 
  Layers, 
  Users, 
  Briefcase,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ROLES = [
  {
    id: "admin",
    label: "Admin",
    icon: Building2,
    description: "Full system control",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    selectedBg: "bg-purple-50",
    demoEmail: "admin@company.com",
    demoPassword: "admin123"
  },
  {
    id: "asset-manager",
    label: "Asset Manager",
    icon: Layers,
    description: "Manage assets & maintenance",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    selectedBg: "bg-blue-50",
    demoEmail: "manager@company.com",
    demoPassword: "manager123"
  },
  {
    id: "department-head",
    label: "Department Head",
    icon: Users,
    description: "Oversee department assets",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    selectedBg: "bg-emerald-50",
    demoEmail: "head@company.com",
    demoPassword: "head123"
  },
  {
    id: "employee",
    label: "Employee",
    icon: Briefcase,
    description: "Access your assets",
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    selectedBg: "bg-amber-50",
    demoEmail: "employee@company.com",
    demoPassword: "employee123"
  },
];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-select role from URL parameter
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam) {
      const foundRole = ROLES.find(r => r.id === roleParam);
      if (foundRole) {
        setSelectedRole(roleParam);
        setEmail(foundRole.demoEmail);
        setPassword(foundRole.demoPassword);
      }
    }
  }, [searchParams]);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setError("");
    const role = ROLES.find(r => r.id === roleId);
    if (role) {
      setEmail(role.demoEmail);
      setPassword(role.demoPassword);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedRole) {
    setError("Please select your role first");
    return;
  }

  setError("");
  setLoading(true);
  setSuccess(false);

  try {
    const role = ROLES.find(r => r.id === selectedRole);
    await login({ email, password }); // Remove role from login call
    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  } catch (err) {
    setError(err.response?.data?.message || "Couldn't log in. Check your email and password.");
  } finally {
    setLoading(false);
  }
};

  const selectedRoleData = ROLES.find(r => r.id === selectedRole);

  return (
    <main className="min-h-screen flex bg-white">
      {/* Left Side - Role Selection */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-50 via-white to-brand-50/50 flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-300 rounded-full blur-3xl opacity-10" />
        
        <div className="relative">
          <Link href="/landing" className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 transition-colors mb-12">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to home</span>
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25">
                <span className="text-sm font-bold">AF</span>
              </div>
              <span className="text-xl font-bold text-brand-800">AssetFlow</span>
            </div>
            <h1 className="text-3xl font-bold text-brand-800">Welcome back</h1>
            <p className="mt-2 text-[#5F5E5A]">
              Select your role to continue
            </p>
          </div>

          <div className="space-y-3">
            {ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? `${role.border} ${role.selectedBg} shadow-md scale-[1.02]`
                      : "border-brand-100 hover:border-brand-200 hover:bg-brand-50/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${role.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={`text-${role.color.split('-')[1]}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-brand-800">{role.label}</p>
                    <p className="text-xs text-[#5F5E5A]">{role.description}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 size={20} className="text-brand-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-[#5F5E5A]">
            New here?{" "}
            <Link href="/signup" className="text-brand-500 hover:text-brand-600 font-medium">
              Create an employee account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8">
            <Link href="/landing" className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 transition-colors mb-6">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25">
                <span className="text-sm font-bold">AF</span>
              </div>
              <span className="text-xl font-bold text-brand-800">AssetFlow</span>
            </div>
          </div>

          {/* Mobile Role Selection */}
          <div className="lg:hidden mb-6">
            <h2 className="text-lg font-semibold text-brand-800">Select your role</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      isSelected
                        ? `${role.border} ${role.selectedBg}`
                        : "border-brand-100 hover:border-brand-200"
                    }`}
                  >
                    <Icon size={18} className={`mx-auto mb-1 text-${role.color.split('-')[1]}-600`} />
                    <p className="text-xs font-medium text-brand-800">{role.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-100 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-brand-800">
                {selectedRoleData ? `Log in as ${selectedRoleData.label}` : "Log in to your account"}
              </h2>
              <p className="text-sm text-[#5F5E5A] mt-1">
                Enter your credentials to access AssetFlow
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F5E5A] hover:text-brand-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#5F5E5A]">
                  <input type="checkbox" className="rounded border-brand-200 text-brand-500 focus:ring-brand-200" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-sm text-brand-500 hover:text-brand-600 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2">
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-600">Login successful! Redirecting...</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !selectedRole}
                className={`w-full py-3 text-white font-medium rounded-xl transition-all ${
                  loading || !selectedRole
                    ? "bg-brand-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
                }`}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#5F5E5A] lg:hidden">
              New here?{" "}
              <Link href="/signup" className="text-brand-500 hover:text-brand-600 font-medium">
                Create account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}