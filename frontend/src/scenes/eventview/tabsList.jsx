import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Participants from "../participants";
import HomeTab from "./hometab";
import Messages from "../messages";
import MyWishes from "../mywishes";
import axios from "axios";

function TabsList({
  eventId,
  playerUserId,
  players,
  receiver,
  giver,
  eventDatePassed,
  participantsId,
  productDetails,
  setProductDetails,
  eventDetails,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProductAdded = () => {
    // Fetch the updated product details and update the state
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/all/${participantsId}`)
      .then((res) => {
        console.log("Updated Product Details: ", res.data);
        setProductDetails(res.data);
      });
  };
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
            marginRight: isSmallScreen ? "12px" : "20px",
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
            marginRight: isSmallScreen ? "12px" : "20px",
            padding: "0 0 6px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => handleTabActive(1)}
        >
          Participants
        </Typography>
        <Typography
          isActive={activeTab === 2}
          className={`tab ${activeTab === 2 ? "active" : "notactive"}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isSmallScreen ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: isSmallScreen ? "12px" : "20px",
            padding: "0 0 6px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => handleTabActive(2)}
        >
          Messages
        </Typography>
        <Typography
          isActive={activeTab === 3}
          className={`tab ${activeTab === 3 ? "active" : "notactive"}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isSmallScreen ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            // marginRight: isSmallScreen ? "12px" : "20px",
            padding: "0 0 6px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => handleTabActive(3)}
        >
          My Wishes
        </Typography>
      </Box>
      {activeTab === 0 && (
        <HomeTab
          eventId={eventId}
          playerUserId={playerUserId}
          players={players}
          productDetails={productDetails}
          receiver={receiver}
          eventDatePassed={eventDatePassed}
          giver={giver}
          eventDetails={eventDetails}
        />
      )}
      {activeTab === 1 && (
        <Box>
          <Participants />
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          <Messages eventId={eventId} userId={playerUserId} />
        </Box>
      )}
      {activeTab === 3 && (
        <Box>
          <MyWishes
            eventId={eventId}
            userId={playerUserId}
            onProductAdded={handleProductAdded}
          />
        </Box>
      )}
    </>
  );
}

export default TabsList;
