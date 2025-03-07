import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router";
import "./Registration.css";
import axios from "axios";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1800/api/users/login",
        userDetails
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <TextField
            name="email"
            onChange={handleChange}
            fullWidth
            label="Email"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            name="password"
            onChange={handleChange}
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
          <Typography marginTop={"10px"}>
            New User ? <Link to="/registration">Register</Link>{" "}
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Login;
