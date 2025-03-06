import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";

const Login = () => {
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
        backgroundColor: "rgba(5, 5, 5, 0.2)",
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
          Login
        </Typography>
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
        <Typography marginTop={"10px"}>
          New User ? <Link to="/registration">Register</Link>{" "}
        </Typography>
      </div>
    </div>
  );
};

export default Login;
