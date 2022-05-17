import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  TextField,
  Box,
  Button,
  Paper,
  Typography,
  FormControl,
} from "@mui/material";
import { login } from "../../apiRequests/apiRequests";

export const LoginPage = () => {
  const defaultUserData = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(defaultUserData);

  const handleChangeInput = (prop) => (e) => {
    setUserData({ ...userData, [prop]: e.target.value });
  };

  const handleLogin = () => {};

  useEffect(() => {
    return () => {
      console.log(userData);
    };
  });

  return (
    <div className="login-wrapper">
      <Box component="form">
        <Paper className="login-box">
          <Typography sx={{ pb: "10px", fontWeight: "bold" }} variant="h5">
            Log in!
          </Typography>
          <div className="login-flex">
            <TextField
              required
              name="email"
              type="email"
              variant="filled"
              label="E-Mail"
              onChange={handleChangeInput("email")}
              sx={{ background: "white" }}
            ></TextField>

            <TextField
              required
              name="password"
              type="password"
              variant="filled"
              label="Password"
              onChange={handleChangeInput("password")}
              sx={{ background: "white" }}
            ></TextField>

            <Button
              type="submit"
              onClick={() => login(userData)}
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "#4bd876",
                },
              }}
            >
              Login
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};
