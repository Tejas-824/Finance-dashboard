"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import SummaryCards from "../../components/SummaryCards";
import RecordTable from "../../components/RecordTable";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [recentRecords, setRecentRecords] = useState([]);
  const [message, setMessage] = useState("");

  const fetchDashboardData = async () => {
    try {
      setMessage("");

      const summaryRes = await api.get("/summary");
      setSummary(summaryRes.data);

      if (user?.role === "analyst" || user?.role === "admin") {
        const recordsRes = await api.get("/records?limit=5");
        setRecentRecords(recordsRes.data.records || []);
      } else {
        setRecentRecords(summaryRes.data.recentActivity || []);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load dashboard");
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <ProtectedRoute roles={["viewer", "analyst", "admin"]}>
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <Navbar />

          <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800">Dashboard</h2>
            <p className="mt-2 text-sm text-slate-600">
              Logged in as <span className="font-semibold">{user?.name}</span>
            </p>
          </div>

          {message ? (
            <div className="rounded-xl bg-white p-5 text-sm text-red-500 shadow-sm">
              {message}
            </div>
          ) : (
            <>
              <SummaryCards summary={summary} />

              <div className="mt-6">
                <RecordTable
                  title={user?.role === "viewer" ? "Recent Activity" : "Recent Records"}
                  records={recentRecords}
                  loading={!summary}
                  showCreatedBy={user?.role === "admin"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}