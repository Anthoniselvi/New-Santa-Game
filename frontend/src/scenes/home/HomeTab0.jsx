import React from "react";
import Upcoming from "./Upcoming";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function HomeTab0({ upcomingEvents, userId, isSmallScreen }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/eventcreate?userId=${userId}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        background: "#ffffff",
        minHeight: "80vh",
        borderRadius: "0 0 15px 15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: isSmallScreen ? "10px" : "20px",
          padding: isSmallScreen ? "10px" : "20px",
          flexDirection: isSmallScreen ? "column" : "initial",
        }}
      >
        <Box
          sx={{
            width: isSmallScreen ? "250px" : 220,
            height: isSmallScreen ? "120px" : "230px",
            m: isSmallScreen ? "1rem" : "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isSmallScreen ? "10px" : "30px",
            border: "1px solid lightgrey",
            "&:hover": {
              backgroundColor: "#E64848",
              color: "white",
            },
            borderRadius: "10px",
            padding: "0 12px",
            boxSizing: "border-box",
          }}
          onClick={handleClick}
        >
          <AddCircleOutlineIcon
            sx={{
              fontSize: isSmallScreen ? "1.5rem" : "3rem",
            }}
          />
          <Typography>Create a new event</Typography>
        </Box>
        <Upcoming
          isSmallScreen={isSmallScreen}
          upcomingEvents={upcomingEvents}
          userId={userId}
        />
      </Box>
    </Box>
  );
}

export default HomeTab0;
