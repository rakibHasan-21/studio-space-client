"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Aperture,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  LogOut,
} from "lucide-react";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Main Navigation
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  // User Dropdown Links
  const dropdownLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add New Studio",
      href: "/addstudio",
      icon: PlusCircle,
    },
    {
      name: "My Studio Listings",
      href: "/my-listings",
      icon: Building2,
    },
    {
      name: "My Bookings",
      href: "/dashboard/my-bookings",
      icon: CalendarDays,
    },
  ];

  // Active Route
  const isActive = (href) => {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed!");
        return;
      }

      setDropdownOpen(false);
      setMobileOpen(false);

      toast.success("Logged out successfully!");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="navbar-animate sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
            <Aperture size={25} strokeWidth={2.2} />
          </div>

          <span className="text-[23px] font-extrabold tracking-tight text-slate-900">
            Studio<span className="text-indigo-600">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-slate-100 bg-slate-50/80 p-1.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                isActive(link.href)
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/70"
                  : "text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
          ) : !user ? (
            <>
              <Link
                href="/login"
                className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-700 transition duration-300 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Register
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* User Profile Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <img
                  src={
                    user.image ||
                    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop"
                  }
                  alt="Profile"
                  className="h-9 w-9 rounded-full border-2 border-indigo-100 object-cover"
                />

                <span className="max-w-28 truncate text-sm font-bold text-slate-800">
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10">
                  <div className="mb-2 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 px-4 py-4">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  {dropdownLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Icon size={17} />
                        {link.name}
                      </Link>
                    );
                  })}

                  <div className="my-2 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut size={17} />
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl shadow-slate-900/5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isPending ? (
              <div className="mt-3 h-12 animate-pulse rounded-xl bg-slate-100" />
            ) : !user ? (
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-center text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-700 hover:to-violet-700"
                >
                  Register
                </Link>
              </div>
            ) : (
              <>
                {/* Mobile User Info */}
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-indigo-50 p-3">
                  <img
                    src={user.image || "/avatar.png"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Dashboard Links */}
                {dropdownLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Icon size={17} />
                      {link.name}
                    </Link>
                  );
                })}

                {/* Mobile Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="mt-2 flex items-center gap-3 rounded-xl border-t border-slate-100 px-4 py-4 text-sm font-semibold text-red-500 disabled:opacity-50"
                >
                  <LogOut size={17} />
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
