import React, { useState, useEffect } from "react";
import { TextField, Box, Button, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../apiRequests/apiRequests";

export const LoginPage = () => {
  const defaultUserData = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(defaultUserData);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const dispatch = useDispatch();

  console.log(userData);

  useEffect(() => {
    return () => {};
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
              value={userData.email}
              onChange={handleChangeInput}
              sx={{ background: "white" }}
            ></TextField>

            <TextField
              required
              name="password"
              type="password"
              variant="filled"
              label="Password"
              value={userData.password}
              onChange={handleChangeInput}
              sx={{ background: "white" }}
            ></TextField>

            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(login(userData));
              }}
              variant="contained"
              className="link-button"
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
