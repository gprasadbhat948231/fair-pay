import React, { useState } from "react";
import "./Registration.css";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1800/api/users/register",
        formData
      );
      navigateTo("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <Typography variant="h6" gutterBottom>
          Registration Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            onChange={handleChange}
            name="fullname"
            label="Full Name"
            required
          />
          <TextField
            fullWidth
            onChange={handleChange}
            name="email"
            label="Email"
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            name="password"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            onChange={handleChange}
            name="phone"
            type="number"
            margin="normal"
            required
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
        <Typography marginTop={"10px"}>
          Already have an account ? <Link to="/login">Login</Link>{" "}
        </Typography>
      </div>
    </div>
  );
};

export default Registration;
