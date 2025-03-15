import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Group, MonetizationOn, Category } from "@mui/icons-material";
import "./Expenses.css";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  p: 4,
};

const Expenses = () => {
  const [newExpenseModal, setNewExpenseModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    expense_name: "",
    group_id: "",
    category: "",
  });
  const [groupList, setGroupList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  const handleAddExpenseModalOpen = () => setAddExpenseModal(true);

  const handleNewExpenseModalOpen = () => setNewExpenseModal(true);

  const handleNewexpensesClose = () => setNewExpenseModal(false);

  const handleAddExpensesClose = () => setAddExpenseModal(false);

  const handleNewExpenseSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userCreds"));
    const response = await axios.post(
      "http://localhost:1800/api/expense/new-expense",
      { ...newExpense, created_by: userData._id }
    );
    if (response) {
      setNewExpenseModal(false);
    }
  };

  const handleChange = () => {
    console.log("Change");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userCreds"));
    try {
      const fetchList = async () => {
        let response = await axios.post(
          "http://localhost:1800/api/group/get-groups",
          { user_id: userData._id }
        );

        if (response) {
          setGroupList(response.data.data);
        }
      };
      fetchList();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userCreds"));
    try {
      const fetchList = async () => {
        let response = await axios.post(
          "http://localhost:1800/api/expense/get-expense-list",
          { user_id: userData._id }
        );

        if (response) {
          setExpensesList(response.data.data);
        }
      };
      fetchList();
    } catch (err) {
      console.log(err);
    }
  }, [newExpenseModal]);

  const handleExpensesChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  return (
    <div className="expenses-container">
      <div className="expense-btn-containeer">
        <Button
          onClick={handleNewExpenseModalOpen}
          sx={{
            height: "40px",
            background:
              "linear-gradient(90deg,rgba(109, 199, 221, 0.41),#df73407a);",
            borderRadius: "10px",
            color: "black",
          }}
        >
          New Expense
        </Button>
      </div>
      <div className="cards-container">
        {expensesList?.map((expense) => (
          <Card
            sx={{
              margin: "auto",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              background:
                "linear-gradient(180deg,rgba(129, 154, 160, 0.46),rgba(170, 103, 75, 0.53))",
              width: "350px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <CardHeader
              title={expense.expense_name}
              sx={{ fontWeight: "bold" }}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Group color="primary" /> <b>Total members:</b>{" "}
                {expense.member_count}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <MonetizationOn color="success" /> <b>Amount spent:</b> {expense.amount}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Category color="secondary" /> <b>Category:</b> {expense.category}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddExpenseModalOpen}
              >
                Add Expenses
              </Button>
            </CardActions>
          </Card>
        ))}

        {newExpenseModal && (
          <Modal
            open={newExpenseModal}
            onClose={handleNewexpensesClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form
              onSubmit={handleNewExpenseSubmit}
              className="expenses-modal-form"
            >
              <Box sx={style}>
                <FormControl>
                  <TextField
                    fullWidth
                    name="expense_name"
                    label="Expense Name"
                    required
                    onChange={handleExpensesChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ backgroundColor: "white" }}
                    id="select-group-label"
                  >
                    Select groups
                  </InputLabel>
                  <Select
                    labelId="select-group-label"
                    id="select-group-select-id"
                    defaultValue=""
                    label="Select Group"
                    name="group_id"
                    required
                    onChange={handleExpensesChange}
                  >
                    {groupList?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.groupName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="select-category-label">Category</InputLabel>
                  <Select
                    labelId="select-category-label"
                    id="select-category-id"
                    defaultValue=""
                    label="Category"
                    name="category"
                    required
                    onChange={handleExpensesChange}
                  >
                    <MenuItem value={"Travelling"}> Travelling</MenuItem>
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"HomeExpenses"}>House Expenses</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  Submit
                </Button>
              </Box>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Expenses;
