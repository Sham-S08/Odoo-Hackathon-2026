"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Shield,
  Users,
  Layers,
  Calendar,
  BarChart3,
  Settings,
  Database,
  Briefcase,
  ChevronRight,
  Building2,
  Star
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ROLES = [
    {
      title: "Admin",
      icon: Settings,
      description: "Full control over organization setup, departments, categories, and user roles.",
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      features: ["Manage departments", "Asset categories", "Role assignment"],
      roleId: "admin"
    },
    {
      title: "Asset Manager",
      icon: Layers,
      description: "Register, allocate, and maintain assets with full lifecycle management.",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      features: ["Asset registration", "Allocation control", "Maintenance approval"],
      roleId: "asset-manager"
    },
    {
      title: "Department Head",
      icon: Users,
      description: "Oversee departmental assets, approve requests, and book resources.",
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      features: ["Department oversight", "Request approval", "Resource booking"],
      roleId: "department-head"
    },
    {
      title: "Employee",
      icon: Briefcase,
      description: "Access your allocated assets, book resources, and raise maintenance requests.",
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      features: ["View assets", "Book resources", "Raise requests"],
      roleId: "employee"
    },
  ];

  const FEATURES = [
    {
      icon: Database,
      title: "Asset Registry",
      description: "Centralized database with QR codes, custom fields, and full audit history.",
    },
    {
      icon: Calendar,
      title: "Resource Booking",
      description: "Time-slot based booking with overlap validation and calendar views.",
    },
    {
      icon: TrendingUp,
      title: "Allocation Tracking",
      description: "Real-time visibility into who holds what, with transfer workflows.",
    },
    {
      icon: Shield,
      title: "Maintenance Management",
      description: "Approval workflows, technician assignment, and history tracking.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Utilization trends, heatmaps, and exportable operational insights.",
    },
    {
      icon: Clock,
      title: "Audit & Compliance",
      description: "Structured verification cycles with automated discrepancy reporting.",
    },
  ];

  const WORKFLOW_STEPS = [
    { step: "01", title: "Register", desc: "Add assets with tags, photos, and custom fields." },
    { step: "02", title: "Allocate", desc: "Assign to employees or departments with return dates." },
    { step: "03", title: "Manage", desc: "Track maintenance, transfers, and bookings." },
    { step: "04", title: "Audit", desc: "Run verification cycles and generate reports." },
  ];

  const TESTIMONIALS = [
    {
      quote: "AssetFlow transformed how we track our IT equipment. We went from spreadsheets to real-time visibility in days.",
      author: "Priya Sharma",
      role: "IT Director, TechCorp",
    },
    {
      quote: "The booking system alone saved us hundreds of hours of scheduling conflicts. Game changer for our shared resources.",
      author: "Raj Patel",
      role: "Operations Manager, GreenSpace",
    },
    {
      quote: "Audit cycles that used to take weeks now complete in hours. The discrepancy reports are a lifesaver.",
      author: "Ananya Reddy",
      role: "Compliance Officer, MedLife",
    },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-brand-100/50" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/landing" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
                <span className="text-sm font-bold">AF</span>
              </div>
              <span className="text-xl font-bold text-brand-800">AssetFlow</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-[#5F5E5A] hover:text-brand-600 transition-colors">
                Features
              </Link>
              <Link href="#workflow" className="text-sm text-[#5F5E5A] hover:text-brand-600 transition-colors">
                How it works
              </Link>
              <Link href="#testimonials" className="text-sm text-[#5F5E5A] hover:text-brand-600 transition-colors">
                Testimonials
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="inline ml-1.5 h-4 w-4" />
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-brand-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-brand-100/50">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              <Link href="#features" className="block py-2 text-[#5F5E5A] hover:text-brand-600 transition-colors">
                Features
              </Link>
              <Link href="#workflow" className="block py-2 text-[#5F5E5A] hover:text-brand-600 transition-colors">
                How it works
              </Link>
              <Link href="#testimonials" className="block py-2 text-[#5F5E5A] hover:text-brand-600 transition-colors">
                Testimonials
              </Link>
              <div className="pt-3 border-t border-brand-100/50 flex flex-col gap-2">
                <Link href="/login" className="py-2 text-center text-brand-600 font-medium">
                  Log in
                </Link>
                <Link
                  href="/login"
                  className="py-3 text-center text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl font-medium"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-50 via-white to-brand-50/50 pt-16 md:pt-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-300 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-100/10 to-brand-300/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                </span>
                <span className="text-xs font-medium text-brand-600">Enterprise-grade ERP</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Simplify Asset & Resource
                <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent block mt-2">Management</span>
              </h1>

              <p className="mt-6 text-lg text-[#5F5E5A] max-w-lg leading-relaxed">
                Track, allocate, and maintain your organization's physical assets and shared resources through a centralized, intuitive platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="px-8 py-3.5 text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-3.5 text-brand-600 bg-white border border-brand-200 rounded-xl font-medium hover:bg-brand-50 transition-all hover:-translate-y-0.5"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-xs font-medium text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-800">Trusted by 500+ organizations</p>
                  <p className="text-xs text-[#5F5E5A]">From startups to enterprises</p>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-white/50">
                  <div className="bg-gradient-to-br from-brand-50 to-white rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AF</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-brand-800">AssetFlow</p>
                          <p className="text-[10px] text-[#5F5E5A]">Dashboard</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-brand-100" />
                        <div className="h-6 w-6 rounded-full bg-brand-100" />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { label: "Assets", value: "2,847", color: "bg-brand-50" },
                        { label: "Allocated", value: "1,234", color: "bg-blue-50" },
                        { label: "Available", value: "1,013", color: "bg-green-50" },
                        { label: "Maintenance", value: "47", color: "bg-amber-50" },
                      ].map((kpi) => (
                        <div key={kpi.label} className={`${kpi.color} rounded-lg p-2`}>
                          <p className="text-[8px] text-[#5F5E5A]">{kpi.label}</p>
                          <p className="text-sm font-bold text-brand-800">{kpi.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="h-20 bg-gradient-to-r from-brand-100/50 via-brand-200/30 to-brand-100/50 rounded-lg mb-3 flex items-center justify-center">
                      <div className="flex items-end gap-1 h-12 w-full px-3">
                        {[40, 60, 45, 80, 70, 55, 90, 65, 75, 50].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-brand-400/60 rounded-t"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-[8px] text-[#5F5E5A]">12 active allocations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] text-brand-500 font-medium">View all →</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-xl rounded-xl p-2 shadow-lg border border-white/50 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-[9px] font-medium text-brand-800">Asset allocated</p>
                      <p className="text-[7px] text-[#5F5E5A]">Laptop AF-0114 → Priya S.</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/80 backdrop-blur-xl rounded-xl p-2 shadow-lg border border-white/50">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Clock size={14} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[9px] font-medium text-brand-800">Maintenance due</p>
                      <p className="text-[7px] text-[#5F5E5A]">Room B2 • 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800">
              Built for Every Role
            </h2>
            <p className="mt-4 text-[#5F5E5A] max-w-2xl mx-auto">
              AssetFlow adapts to your organization's hierarchy with role-based access for every stakeholder.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLES.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.title}
                  className="group relative p-6 rounded-2xl border border-brand-100 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${role.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} className="text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-800">{role.title}</h3>
                  <p className="mt-2 text-sm text-[#5F5E5A] leading-relaxed">{role.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-[#5F5E5A]">
                        <CheckCircle size={12} className="text-brand-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/login?role=${role.roleId}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-brand-500 group-hover:text-brand-600 transition-colors"
                  >
                    Access as {role.title}
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5"
            >
              Choose your role and get started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-gradient-to-br from-brand-50 via-white to-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800">
              Everything You Need to Manage Assets
            </h2>
            <p className="mt-4 text-[#5F5E5A] max-w-2xl mx-auto">
              From registration to retirement — AssetFlow provides a complete toolkit for asset lifecycle management.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-white border border-brand-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                    <Icon size={20} className="text-brand-500" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-800">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[#5F5E5A] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800">
              How AssetFlow Works
            </h2>
            <p className="mt-4 text-[#5F5E5A] max-w-2xl mx-auto">
              A streamlined workflow from asset registration to retirement.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl border border-brand-100 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-2xl font-bold text-brand-200">{item.step}</div>
                <h3 className="mt-2 text-lg font-semibold text-brand-800">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5F5E5A]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-20 bg-gradient-to-br from-brand-50 via-white to-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800">
              Trusted by Organizations
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="p-6 rounded-2xl bg-white border border-brand-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-sm text-[#1A1730] leading-relaxed">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-medium text-brand-800">{testimonial.author}</p>
                  <p className="text-xs text-[#5F5E5A]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-brand-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Asset Management?
          </h2>
          <p className="mt-4 text-brand-200 text-lg max-w-2xl mx-auto">
            Join thousands of organizations already using AssetFlow to streamline their operations.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-700 rounded-xl font-medium shadow-lg hover:shadow-2xl transition-all hover:-translate-y-0.5"
          >
            Get Started Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-900 text-brand-300 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white text-sm font-bold">
                  AF
                </div>
                <span className="text-lg font-bold text-white">AssetFlow</span>
              </div>
              <p className="text-sm text-brand-400 max-w-sm">
                Enterprise Asset & Resource Management System — simplifying how organizations track, allocate, and maintain their assets.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#workflow" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Sign in</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-brand-400">Help Center</span></li>
                <li><span className="text-brand-400">Documentation</span></li>
                <li><span className="text-brand-400">API Reference</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-brand-800 text-center text-sm text-brand-400">
            &copy; {new Date().getFullYear()} AssetFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}