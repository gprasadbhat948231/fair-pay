import mongoose from "mongoose";

const ExpensesSchema = mongoose.Schema({
  expense_name: { type: String, required: true },
  group_id: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now() },
  created_by: {
    type: String,
    required: true,
  },
});

const expenseModel = mongoose.model("expense", ExpensesSchema);

export default expenseModel;
