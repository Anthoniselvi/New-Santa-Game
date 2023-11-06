import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import { Box, Typography } from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 20px",
        padding: "20px",
        "@media (min-width: 768px)": {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 20px",
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#C21010",
          fontSize: "2rem",
        }}
      >
        <b>SANTA </b>SURPRISE
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          "@media (min-width: 768px)": {
            gap: "20px",
          },
        }}
      >
        <Typography
          component="button"
          variant="button"
          sx={{
            "@media (min-width: 768px)": {
              border: "2px solid #C21010",
              padding: "5px 20px",
              backgroundColor: "white",
              color: "#C21010",
              letterSpacing: "1px",
              borderRadius: "10px",
              fontSize: "20px",
              textTransform: "inherit",
              "&:hover": {
                backgroundColor: "#c21010",
                color: "white",
                cursor: "pointer",
              },
            },
            border: "2px solid #C21010",
            padding: "1px 15px",
            textTransform: "inherit",
            borderRadius: "10px",
            color: "#C21010",
            background: "white",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#c21010",
              color: "white",
              cursor: "pointer",
            },
          }}
          onClick={handleClick}
        >
          Login
        </Typography>
        <Typography
          component="button"
          variant="button"
          sx={{
            "@media (min-width: 768px)": {
              border: "2px solid #C21010",
              padding: "5px 20px",
              backgroundColor: "#C21010",
              color: " white",
              letterSpacing: "1px",
              borderRadius: "10px",
              fontSize: "20px",
              "&:hover": {
                color: "#c21010",
                background: "white",
                cursor: "pointer",
              },
            },
            border: "2px solid #C21010",
            padding: "1px 15px",
            textTransform: "inherit",
            borderRadius: "10px",
            color: "white",
            background: "#C21010",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "white",
              color: "#c21010",
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Navbar;
