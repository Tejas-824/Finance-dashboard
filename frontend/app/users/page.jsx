"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import api from "../../lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setMessage("");
      const res = await api.get("/users");
      setUsers(res.data.users || []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    try {
      await api.patch(`/users/${id}/role`, { role });
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update role");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/users/${id}/status`, { status });
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <ProtectedRoute roles={["admin"]}>
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <Navbar />
          <h2 className="mb-6 text-2xl font-semibold text-slate-800">Users</h2>

          {message && (
            <div className="mb-4 rounded-xl bg-white p-4 text-sm text-red-500 shadow-sm">
              {message}
            </div>
          )}

          <div className="overflow-x-auto rounded-xl bg-white p-5 shadow-sm">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-600">
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Change Role</th>
                  <th className="px-3 py-3">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td colSpan="6" className="px-3 py-6 text-center text-slate-500">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((item) => (
                    <tr key={item._id} className="border-b border-slate-100">
                      <td className="px-3 py-3">{item.name}</td>
                      <td className="px-3 py-3">{item.email}</td>
                      <td className="px-3 py-3 capitalize">{item.role}</td>
                      <td className="px-3 py-3 capitalize">{item.status}</td>
                      <td className="px-3 py-3">
                        <select
                          value={item.role}
                          onChange={(e) => updateRole(item._id, e.target.value)}
                          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        >
                          <option value="viewer">viewer</option>
                          <option value="analyst">analyst</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="px-3 py-3">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item._id, e.target.value)}
                          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        >
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 py-6 text-center text-slate-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}