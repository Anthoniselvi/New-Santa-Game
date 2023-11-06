import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

function Enter({ eventId, participantsId }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(`/login1?eventId=${eventId}&participantsId=${participantsId}`);
  };

  const handleSignup = () => {
    navigate(`/signup2?eventId=${eventId}&participantsId=${participantsId}`);
  };

  return (
    <Box
      sx={{
        border: "1px solid grey",
        borderRadius: "10px",
        width: "280px",
        padding: "10px",
        fontSize: "1rem",
        color: "#0f7b9b",
        background: "#fff",
        textTransform: "inherit",
        fontWeight: "bold",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          color: "#101a34",
          fontWeight: 600,
          fontSize: "17px",
          lineHeight: "22px",
          textAlign: "center",
          marginRight: "20px",
          padding: "0 0 6px",
        }}
      >
        Awesome! Login or Sign up to confirm your RSVP
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            border: "2px solid #C21010",
            borderRadius: "10px",
            width: "48%",
            fontSize: "1rem",
            color: "white",
            background: "#C21010",
            textTransform: "inherit",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "white",
              color: "#C21010",
              border: "1px solid #0f7b9b",
            },
            marginTop: "10px",
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={handleSignup}
          sx={{
            border: "2px solid #C21010",
            borderRadius: "10px",
            width: "48%",
            fontSize: "1rem",
            color: "white",
            background: "#C21010",
            textTransform: "inherit",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "white",
              color: "#C21010",
              border: "1px solid #0f7b9b",
            },
            marginTop: "10px",
          }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
}

export default Enter;
