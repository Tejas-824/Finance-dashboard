"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import RecordForm from "../../components/RecordForm";
import RecordTable from "../../components/RecordTable";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function RecordsPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loadingRecords, setLoadingRecords] = useState(true);

  const fetchRecords = async () => {
    try {
      setLoadingRecords(true);
      setMessage("");
      const res = await api.get(`/records?search=${encodeURIComponent(search)}`);
      setRecords(res.data.records || []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load records");
      setRecords([]);
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [search]);

  return (
    <ProtectedRoute roles={["analyst", "admin"]}>
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <Navbar />

          <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800">Records</h2>
            <p className="mt-2 text-sm text-slate-600">
              {user?.role === "admin"
                ? "You have full access to create and manage financial records."
                : "You have read-only access to records and insights."}
            </p>
          </div>

          <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
            <input
              type="text"
              placeholder="Search by notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </div>

          {user?.role === "admin" && (
            <div className="mb-6">
              <RecordForm onAdded={fetchRecords} />
            </div>
          )}

          {message ? (
            <div className="rounded-xl bg-white p-5 text-sm text-red-500 shadow-sm">
              {message}
            </div>
          ) : (
            <RecordTable
              records={records}
              loading={loadingRecords}
              isAdmin={user?.role === "admin"}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}