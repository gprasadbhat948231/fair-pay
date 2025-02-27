import React from "react";
import "./Registration.css";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router";

const Registration = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 400,
          backgroundColor: "white",
          boxShadow: 24,
          padding: 20,
          borderRadius: 2,
          zIndex: 1001,
        }}
      >
        <Typography variant="h6" gutterBottom>
            Registration Form
        </Typography>
        <TextField fullWidth label="Full Name" ></TextField>
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <TextField fullWidth label="Phone" type="number" margin="normal"/> 
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
        <Typography marginTop={'10px'} >Already have an account ? <Link to='/login'>Login</Link> </Typography>
      </div>
    </div>
  );
};

export default Registration;
