import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./Creategroup.css";
import axios from "axios";

export default function CreateGroup() {
  const [groupData, setGroupData] = useState({
    groupName: "",
    groupMembers: [],
  });
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userCreds"));
    const getContacts = async () => {
      let contacts = await axios.post(
        "http://localhost:1800/api/contacts/get-contacts",
        { created_by: userData._id }
      );
      let response = contacts.data.data;
      setContactList(response);
    };
    getContacts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userCreds"));
      const response = await axios.post(
        "http://localhost:1800/api/group/save-group",
        { ...groupData, created_by: userData._id }
      );
      if (response) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="create-group-container">
      <div className="create-group-form">
        <Typography variant="h6" gutterBottom>
          Create group
        </Typography>
        <form onSubmit={handleSubmit} className="form-styles">
          <FormControl>
            <TextField
              fullWidth
              onChange={handleChange}
              name="groupName"
              label="Group Name"
              required
            />
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Members
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={groupData.groupMembers}
              label="Members"
              multiple
              name="groupMembers"
              onChange={handleChange}
            >
              {contactList?.map((contact) => {
                return (
                  <MenuItem key={contact.name} value={contact._id}>
                    {contact.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
