import express from "express";
import cors from  "cors";
import dotenv from  "dotenv";
// import connectDB from  "./config/db";
import userRoutes from "./routes/userRoutes.js";
// const expenseRoutes = require() from "./routes/expenseRoutes.js";

dotenv.config();
// connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
// app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
