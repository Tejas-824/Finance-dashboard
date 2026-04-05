import FinancialRecord from "../models/FinancialRecord.js";

export const getSummary = async (req, res, next) => {
  try {
    const records = await FinancialRecord.find()
      .populate("createdBy", "name email role")
      .sort({ date: -1, createdAt: -1 });

    const totalIncome = records
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = records
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const netBalance = totalIncome - totalExpense;

    const categoryTotals = {};
    records.forEach((item) => {
      const key = `${item.type}_${item.category}`;
      if (!categoryTotals[key]) {
        categoryTotals[key] = 0;
      }
      categoryTotals[key] += item.amount;
    });

    const recentActivity = records.slice(0, 5);

    res.status(200).json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryTotals,
      recentActivity
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthlySummary = async (req, res, next) => {
  try {
    const result = await FinancialRecord.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCategorySummary = async (req, res, next) => {
  try {
    const result = await FinancialRecord.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: {
          "_id.category": 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};