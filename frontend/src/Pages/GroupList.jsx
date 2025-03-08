import { Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Grouplist.css";

const GroupList = () => {
  const paginationModel = { page: 0, pageSize: 5 };
  const columns = [
    {
      field: "groupname",
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
      field: "totalmembers",
      headerName: "Total members",
      width: 330,
      disableColumnMenu: true,
    },
    {
      field: 'edit',
      headerName:'Edit',
      width:100,
      disableColumnMenu:true
    }
  ];
  const rows = [
    {
      id: 1,
      totalmembers: "10",
      groupname: "Snow",
      created_at: "2022-10-20",
      expenses: 35,
    },
    {
      id: 2,
      totalmembers: "10",
      groupname: "Lannister",
      created_at: "2022-10-20",
      expenses: 42,
    },
    {
      id: 3,
      totalmembers: "10",
      groupname: "Lannister",
      created_at: "2022-10-20",
      expenses: 45,
    },
    {
      id: 4,
      totalmembers: "10",
      groupname: "Stark",
      created_at: "2022-10-20",
      expenses: 16,
    },
    {
      id: 5,
      totalmembers: "10",
      groupname: "Targaryen",
      created_at: "2022-10-20",
      expenses: 23,
    },
    {
      id: 6,
      totalmembers: "10",
      groupname: "Melisandre",
      created_at: "2022-10-20",
      expenses: 150,
    },
    {
      id: 7,
      totalmembers: "10",
      groupname: "Clifford",
      created_at: "2023-10-20",
      expenses: 44,
    },
    {
      id: 8,
      totalmembers: "10",
      groupname: "Frances",
      created_at: "2022-10-20",
      expenses: 36,
    },
    {
      id: 9,
      totalmembers: "10",
      groupname: "Roxie",
      created_at: "2022-10-20",
      expenses: 65,
    },
  ];
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
            + New Group
          </Button>
        </div>
        <div className="group-table">
          <Paper sx={{ height: 570, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{
                border: 0,
                "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                  {
                    outline: "none",
                  },
                  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
      outline: 'none',
    },
              }}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
