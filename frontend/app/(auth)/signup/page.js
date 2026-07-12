"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { signup } from "@/services/auth";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      router.push("/login");
    } catch (err) {
      setError("Couldn't create your account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-[340px] rounded-2xl border border-brand-100 p-8">
        <h1 className="mb-1 text-center text-lg font-medium text-brand-800">
          Create your account
        </h1>
        <p className="mb-6 text-center text-xs text-[var(--text-muted)]">
          Sign up creates an employee account. Admin roles are assigned later
          from the employee directory.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full name"
            placeholder="Priya Shah"
            value={form.name}
            onChange={update("name")}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="name@company.com"
            value={form.email}
            onChange={update("email")}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={update("password")}
            required
          />

          {error && <p className="text-xs text-red-600">{error}</p>}

          <Button type="submit" loading={loading} className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          Already have an account?{" "}
          <a href="/login" className="text-brand-500">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
