import mongoose from "mongoose";
import FinancialRecord from "../models/FinancialRecord.js";

export const createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await FinancialRecord.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user._id
    });

    const populatedRecord = await FinancialRecord.findById(record._id).populate(
      "createdBy",
      "name email role status"
    );

    res.status(201).json({
      message: "Record created successfully",
      record: populatedRecord
    });
  } catch (error) {
    next(error);
  }
};

export const getRecords = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate, search, page = 1, limit = 5 } = req.query;

    const query = {};

    if (type) query.type = type;
    if (category) query.category = { $regex: category, $options: "i" };
    if (search) query.notes = { $regex: search, $options: "i" };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await FinancialRecord.countDocuments(query);

    const records = await FinancialRecord.find(query)
      .populate("createdBy", "name email role status")
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      records
    });
  } catch (error) {
    next(error);
  }
};

export const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid record id" });
    }

    const record = await FinancialRecord.findById(id).populate(
      "createdBy",
      "name email role status"
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ record });
  } catch (error) {
    next(error);
  }
};

export const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid record id" });
    }

    const record = await FinancialRecord.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    const { amount, type, category, date, notes } = req.body;

    if (amount !== undefined) record.amount = amount;
    if (type !== undefined) record.type = type;
    if (category !== undefined) record.category = category;
    if (date !== undefined) record.date = date;
    if (notes !== undefined) record.notes = notes;

    await record.save();

    const updatedRecord = await FinancialRecord.findById(record._id).populate(
      "createdBy",
      "name email role status"
    );

    res.status(200).json({
      message: "Record updated successfully",
      record: updatedRecord
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid record id" });
    }

    const record = await FinancialRecord.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await record.deleteOne();

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
};