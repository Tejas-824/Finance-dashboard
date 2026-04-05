"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const getRoleBadgeClasses = (role) => {
  if (role === "admin") return "bg-emerald-100 text-emerald-700";
  if (role === "analyst") return "bg-blue-100 text-blue-700";
  return "bg-amber-100 text-amber-700";
};

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3 text-sm font-medium">
        <Link href="/dashboard" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
          Dashboard
        </Link>

        {(user?.role === "analyst" || user?.role === "admin") && (
          <Link href="/records" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
            Records
          </Link>
        )}

        {user?.role === "admin" && (
          <Link href="/users" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
            Users
          </Link>
        )}
      </div>

      {user && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">{user.name}</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getRoleBadgeClasses(
                user.role
              )}`}
            >
              {user.role}
            </span>
          </div>

          <button
            onClick={logout}
            className="rounded-md bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;