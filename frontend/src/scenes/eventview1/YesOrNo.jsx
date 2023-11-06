import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Participants from "../participants";
import ActiveTab0 from "./ActiveTab0";

function YesOrNo({ isSmallScreen, eventId }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabActive = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          isActive={activeTab === 0}
          className={`tab ${activeTab === 0 ? "active" : "notactive"}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isSmallScreen ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: "20px",
            padding: "0 0 6px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => handleTabActive(0)}
        >
          Home
        </Typography>
        <Typography
          isActive={activeTab === 1}
          className={`tab ${activeTab === 1 ? "active" : "notactive"}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isSmallScreen ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: "20px",
            padding: "0 0 6px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => handleTabActive(1)}
        >
          Participants
        </Typography>
      </Box>
      <ActiveTab0 eventId={eventId} activeTab={activeTab} />
      {activeTab === 1 && (
        <Box>
          <Participants />
        </Box>
      )}
    </>
  );
}

export default YesOrNo;
