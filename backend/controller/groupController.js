import GroupModel from "../model/group.js";

export const getGroupDetails = async (req, res) => {
  try {
    const { user_id } = req.body;
    const groups = await GroupModel.find({
      $or: [
        { created_by: user_id },
        { groupMembers: { $elemMatch: { $in: [user_id] } } },
      ],
    }).lean();
    if (groups.length > 0) {
      let updatedData = groups.map((item) => {
        return {
          id: item._id,
          groupName: item.groupName,
          expenses: item.expenses,
          created_at: item.created_at,
          total_members: item.groupMembers[0].length,
        };
      });
      return res.status(200).json({
        message: "Your group list has been fetched successfully",
        data: updatedData,
      });
    }
    return res.status(200).json({ data: [] });
  } catch (err) {
    res.status(501).json({ message: "Please contact system admin" });
  }
};

export const saveGroupDetails = async (req, res) => {
  try {
    const { groupName, groupMembers, created_by } = req.body;
    if (!groupName || groupMembers.length <= 0 || !created_by) {
      return res
        .status(400)
        .json({ message: "Please fill all the required details" });
    }
    const newGroup = new GroupModel({ groupName, groupMembers, created_by });
    await newGroup.save();
    return res
      .status(200)
      .json({ message: "New group has beeen created successfully" });
  } catch (err) {
    res.status(501).json({ message: "Please contact system admin" });
  }
};
