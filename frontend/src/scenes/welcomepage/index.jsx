import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router";

function WelcomePage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: isSmallScreen ? "flex-start" : "center",
          gap: "20px",
          height: "90vh",
          width: "100vw",
          padding: isSmallScreen ? "50px 20px" : "0 20px",
        }}
        className="boxcomponent"
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: isSmallScreen ? "2rem" : "5rem",
            color: "#C21010",
          }}
        >
          Gifting made easy
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
            width: isSmallScreen ? "90%" : "600px",
            opacity: "0.5",
            color: "#C21010",
          }}
        >
          Santa Surprise is the easiest way to exchange gifts with friends and
          family for birthdays, holidays, and more!
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            background: "#C21010",
            padding: "10px 15px",
            borderRadius: "10px",
            textTransform: "inherit",
            fontSize: "1rem",
            letterSpacing: "1px",
            color: "#FFF",
            "&:hover": {
              background: "#fff",
              color: "#C21010",
              border: "1px solid #C21010",
            },
            width: isSmallScreen ? "80%" : "auto",
          }}
        >
          Create a Santa Surprise
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomePage;
