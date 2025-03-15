import expensesModel from "../model/expenses.js";
import groupModel from "../model/group.js";
import userModel from "../model/user.js";

export const AddNewExpenses = async (req, res) => {
  try {
    const { expense_name, group_id, category, created_by } = req.body;
    if (!expense_name || !group_id || !category) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    const newExpense = new expensesModel({
      expense_name,
      group_id,
      category,
      created_by,
    });
    await newExpense.save();
    return res
      .status(200)
      .json({ message: "New expense has been saved successfully" });
  } catch (err) {
    res.status(501).json({ message: "Internal server error" });
  }
};

export const getExpensesList = async (req, res) => {
  try {
    const { user_id } = req.body;
    const userId = await userModel.findOne({ _id: user_id });
    if (!userId) {
      return res.status(400).json({ message: "User doesnt exist" });
    }
    const groupList = await groupModel.aggregate([
      {
        $match: {
          $or: [{ created_by: user_id }, { groupMembers: { $in: [user_id] } }],
        },
      },
      {
        $project: {
          _id: 1,
          groupMemberCount: { $size: "$groupMembers" },
        },
      },
    ]);

    let groupIds = [];
    if (groupList?.length > 0) {
      groupList.forEach((item) => groupIds.push(item._id));
    }

    if (!groupList) {
      return res
        .status(400)
        .json({ message: "You are not a part of any of the groups" });
    }

    let expensesList = await expensesModel
      .find({
        group_id: { $in: groupIds },
      })
      .lean();

    expensesList = expensesList.map((item) => {
      let groupListId = groupList.find(
        (gId) => gId._id.toString() === item.group_id.toString()
      );
      if (groupListId)
        return { ...item, member_count: groupListId.groupMemberCount };
    });

    return res
      .status(201)
      .json({ message: "Group list fetched successfully", data: expensesList });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Internal server error" });
  }
};
