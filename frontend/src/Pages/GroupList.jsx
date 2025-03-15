import {
  Box,
  Button,
  Icon,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import "./Grouplist.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const GroupList = () => {
  const [open, setOpen] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [data, setData] = useState({
    groupname: "",
    members: [],
  });

  const handleEdit = (param) => {
    setOpen(true);
  };

  const paginationModel = { page: 0, pageSize: 5 };
  const columns = [
    {
      field: "groupName",
      headerName: "Group name",
      width: 330,
      disableColumnMenu: true,
    },
    {
      field: "expenses",
      headerName: "Expenses",
      width: 330,
      disableColumnMenu: true,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 330,
      disableColumnMenu: true,
    },
    {
      field: "total_members",
      headerName: "Total members",
      width: 330,
      disableColumnMenu: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)} size="small">
          <EditIcon />
        </IconButton>
      ),
    },
  ];

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

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="group-list-page">
      <div className="group-list-container">
        <div className="group-list-header">
          <Typography sx={{ paddingLeft: "20px" }}>Group List</Typography>
          <Button
            sx={{
              height: "40px",
              background:
                "linear-gradient(90deg,rgba(109, 199, 221, 0.41),#df73407a);",
              borderTopRightRadius: "10px",
            }}
          >
            <Link to="/create-group">+ New Group</Link>
          </Button>
        </div>
        <div className="group-table">
          <Paper sx={{ height: 570, width: "100%" }}>
            <DataGrid
              rows={groupList}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{
                border: 0,
                "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                  {
                    outline: "none",
                  },
                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                },
              }}
            />
          </Paper>
        </div>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={handleSubmit}>
              <Box sx={style}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  name="groupname"
                  label="Group name"
                  required
                />
                <TextField
                  fullWidth
                  onChange={handleChange}
                  name="totalmembers"
                  label="Members"
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
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

export default GroupList;
