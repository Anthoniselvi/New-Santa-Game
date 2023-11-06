import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

function DrawNameBtn({
  eventDetails,
  playerUserId,
  isDrawButtonVisible,
  handleDrawNames,
  isButtonDisabled,
  name,
}) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Avatar
          {...stringAvatar(`${name.firstName}`)}
          sx={{
            width: "40px",
            height: "40px",
            background: "#C21010",
            fontSize: "13px",
          }}
        />
        <Box
          sx={{
            paddingLeft: "12px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "16px",
              color: "#818694",
              marginBottom: 0,
            }}
          >
            Organizer
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: "17px",
              lineHeight: "22px",
              color: "#101a34",
              marginBottom: 0,
            }}
          >
            {name.firstName} {name.secondName ? name.secondName : ""}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ paddingRight: "15px" }}>
        {eventDetails.userId !== playerUserId ? null : (
          <>
            {!isDrawButtonVisible ? (
              <>
                <Button
                  sx={{
                    marginRight: "12px",
                    padding: "8px 15px",
                    fontWeight: 600,
                    fontSize: "13px",
                    lineHeight: "18px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    background: "#C21010",
                    color: "#fff",
                    border: "1px solid #C21010",
                    textTransform: "inherit",
                    "&:hover": {
                      color: "#C21010",
                    },
                    "&:disabled": {
                      color: "black",
                      border: "1px solid black",
                      background: "none",
                      opacity: 0.5,
                    },
                  }}
                  disabled
                  onClick={handleDrawNames}
                >
                  Draw Names
                </Button>{" "}
              </>
            ) : (
              <>
                <Button
                  sx={{
                    marginRight: "12px",
                    padding: "8px 15px",
                    fontWeight: 600,
                    fontSize: "13px",
                    lineHeight: "18px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    background: "#C21010",
                    color: "#fff",
                    border: "1px solid #C21010",
                    textTransform: "inherit",
                    "&:hover": {
                      color: "#C21010",
                    },
                    "&:disabled": {
                      color: "black",
                      border: "1px solid black",
                      background: "none",
                      opacity: 0.5,
                    },
                  }}
                  onClick={handleDrawNames}
                  disabled={isButtonDisabled}
                >
                  Draw Names
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default DrawNameBtn;
