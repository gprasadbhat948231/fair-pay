import express from "express";
import {
  AddNewExpenses,
  getExpensesList,
} from "../controller/expensesController.js";

const route = express.Router();

route.post("/new-expense", AddNewExpenses);
route.post("/get-expense-list", getExpensesList);

export default route;
