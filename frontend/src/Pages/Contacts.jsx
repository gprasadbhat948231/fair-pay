import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import "./Grouplist.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Contacts = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const paginationModel = { page: 0, pageSize: 5 };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      disableColumnMenu: true,
    },
    {
      field: "mutual",
      headerName: "Mutual Group",
      width: 300,
      disableColumnMenu: true,
    },
    {
      field: "phone",
      headerName: "Phone number",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
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

  const handleEdit = (data) => {
    setOpen(true);
    setContact({
      name: data.name,
      phone: data.phone,
      email: data.email,
      id: data.id,
    });
  };

  const handleAddContact = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactDetails = JSON.parse(localStorage.getItem("userCreds"));
        setLoading(true);
        let response = await axios.post(
          "http://localhost:1800/api/contacts/get-contacts",
          { created_by: contactDetails._id }
        );
        response = response.data.data;
        if (response.length > 0) {
          setData(response);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e, isUpdate) => {
    e.preventDefault();
    const contactDetails = JSON.parse(localStorage.getItem("userCreds"));
    try {
      setLoading(true);
      let response = null;
      if (isUpdate) {
        response = await axios.patch(
          "http://localhost:1800/api/contacts/update-contact",
          { ...contact }
        );
      } else {
        response = await axios.post(
          "http://localhost:1800/api/contacts/create-contact",
          { ...contact, created_by: contactDetails._id }
        );
      }
      if (response) {
        setLoading(false);
        setOpen(false);
        navigateTo("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
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
    <div className="group-list-container">
      <div className="group-list-header">
        <Typography sx={{ paddingLeft: "20px" }}>Contacts</Typography>
        <Button
          onClick={handleAddContact}
          sx={{
            height: "40px",
            background:
              "linear-gradient(90deg,rgba(109, 199, 221, 0.41),#df73407a);",
            borderTopRightRadius: "10px",
          }}
        >
          + Add Contact
        </Button>
      </div>
      <div className="group-table">
        <Paper sx={{ height: 570, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            loading={loading}
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
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={(e) => handleSubmit(e, true)}>
              <Box sx={style}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  name="name"
                  value={contact.name}
                  label="Name"
                  required
                />
                <TextField
                  fullWidth
                  onChange={handleChange}
                  name="phone"
                  label="Phone number"
                  margin="normal"
                  value={contact.phone}
                  required
                />
                <TextField
                  fullWidth
                  onChange={handleChange}
                  name="email"
                  value={contact.email}
                  label="Email"
                  margin="normal"
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

export default Contacts;
