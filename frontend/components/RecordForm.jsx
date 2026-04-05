"use client";

import { useState } from "react";
import api from "../lib/api";

const RecordForm = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    amount: "",
    type: "income",
    category: "",
    date: "",
    notes: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/records", {
        ...formData,
        amount: Number(formData.amount)
      });

      setMessage("Record added successfully");
      setFormData({
        amount: "",
        type: "income",
        category: "",
        date: "",
        notes: ""
      });
      onAdded();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add record");
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Add Record</h3>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 sm:col-span-2"
        />

        <button
          type="submit"
          className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 sm:w-fit"
        >
          Add Record
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
    </div>
  );
};

export default RecordForm;