import React from "react";
import SantaImg from "../home/7.png";
import { Box } from "@mui/material";
import Details from "./details";

function Santa({
  eventDetails,
  playerUserId,
  rsvpDate,
  setEditPage,
  setInvitePage,
  isSmallScreen,
  isButtonDisabled,
  isDrawButtonVisible,
  handleDrawNames,
  name,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <Box>
        <img
          src={SantaImg}
          alt="santa image"
          height={200}
          width={isSmallScreen ? "100%" : "250"}
          style={{
            margin: isSmallScreen ? "auto auto" : "0px",
          }}
        />
      </Box>
      <Details
        eventDetails={eventDetails}
        playerUserId={playerUserId}
        rsvpDate={rsvpDate}
        setEditPage={setEditPage}
        setInvitePage={setInvitePage}
        isSmallScreen={isSmallScreen}
        isButtonDisabled={isButtonDisabled}
        isDrawButtonVisible={isDrawButtonVisible}
        handleDrawNames={handleDrawNames}
        name={name}
      />
    </Box>
  );
}

export default Santa;
