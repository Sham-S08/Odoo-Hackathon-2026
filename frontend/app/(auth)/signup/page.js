"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { signup } from "@/services/auth";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      await signup(form);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError("Couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-50/50 px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 transition-colors mb-6">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to home</span>
        </Link>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25">
              <span className="text-sm font-bold">AF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-800">Create your account</h1>
              <p className="text-xs text-[#5F5E5A]">Sign up creates an employee account</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-brand-50 border border-brand-100 mb-6">
            <p className="text-xs text-brand-700">
              <AlertCircle size={14} className="inline mr-1.5" />
              Admin roles are assigned later from the employee directory by an Administrator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Priya Shah"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5F5E5A] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5E5A]" />
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
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
                  value={form.password}
                  onChange={update("password")}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-sm"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F5E5A] hover:text-brand-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-[#5F5E5A]">Minimum 6 characters</p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-600">Account created! Redirecting to login...</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-medium rounded-xl transition-all ${
                loading
                  ? "bg-brand-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#5F5E5A]">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-500 hover:text-brand-600 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}