"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginModal({ role, onClose }) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password, role });
      router.push("/dashboard");
    } catch (err) {
      setError("Couldn't log in. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-800/25">
      <div className="w-[300px] rounded-2xl bg-white p-7 shadow-lg">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-brand-500">{role}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[var(--text-muted)] hover:text-brand-700"
          >
            ✕
          </button>
        </div>
        <h3 className="mb-4 text-lg font-medium text-brand-800">Log in to AssetFlow</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            label="Email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right">
            <a href="/forgot-password" className="text-xs text-brand-400">
              Forgot password?
            </a>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <Button type="submit" loading={loading} className="mt-1 w-full">
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
