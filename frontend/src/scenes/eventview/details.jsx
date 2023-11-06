import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ButtonsTab from "./buttons";
import DrawNameBtn from "./DrawNameBtn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Details({
  eventDetails,
  playerUserId,
  rsvpDate,
  setEditPage,
  setInvitePage,
  isSmallScreen,
  isButtonDisabled,
  handleDrawNames,
  name,
  isDrawButtonVisible,
}) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <Box
      sx={{
        width: "100%",
        margin: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: isSmallScreen ? "flex-start" : "center",
          justifyContent: isSmallScreen ? "flex-start" : "space-between",
          marginBottom: "15px",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: isSmallScreen ? "24px" : "28px",
            lineHeight: "34px",
            marginBottom: 0,
            maxWidth: "73%",
            fontWeight: 600,
            color: "#101a34",
            marginLeft: "4px",
          }}
        >
          {eventDetails.eventName}
        </Typography>
        <ButtonsTab
          eventDetails={eventDetails}
          playerUserId={playerUserId}
          rsvpDate={rsvpDate}
          setEditPage={setEditPage}
          setInvitePage={setInvitePage}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "felx-start",
          alignItems: "flex-start",
          marginBottom: "22px",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: "16px",
            color: "#5e6577",
            paddingRight: "15px",
            marginRight: "15px",
            borderRight: isSmallScreen ? "none" : "1px solid #cad3dd",
            marginLeft: "5px",
          }}
        >
          Exchange gifts by:{" "}
          <span style={{ fontWeight: 600, color: "#101a34" }}>
            {eventDetails.giftExchangeDate}
          </span>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            sx={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "#5e6577",
              paddingRight: "15px",
              marginRight: "15px",
              borderRight: isSmallScreen ? "none" : "1px solid #cad3dd",
            }}
          >
            RSVP by:{" "}
            <span style={{ fontWeight: 600, color: "#101a34" }}>
              {eventDetails.rsvpDate}
            </span>
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "#5e6577",
              paddingRight: isSmallScreen ? 0 : "15px",
              marginRight: isSmallScreen ? 0 : "15px",
            }}
          >
            Gift budget:{" "}
            <span style={{ fontWeight: 600, color: "#101a34" }}>
              ₹ {eventDetails.budget}
            </span>
          </Typography>
        </Box>
      </Box>
      <DrawNameBtn
        eventDetails={eventDetails}
        playerUserId={playerUserId}
        isDrawButtonVisible={isDrawButtonVisible}
        handleDrawNames={handleDrawNames}
        isButtonDisabled={isButtonDisabled}
        name={name}
      />
      <Box sx={{ borderBottom: "1px solid #cad3dd", lineHeight: "140%" }}>
        <Box
          sx={{
            fontSize: "15px",
            paddingRight: "10px",
            color: "#5e6577",
            maxWidth: showMore ? "100%" : "500px",
            overflow: "hidden",
            height: showMore ? "auto" : "30px",
            lineHeight: "20px",
          }}
          className="event-details-content"
        >
          <Typography
            sx={{
              marginLeft: "5px",
            }}
          >
            {eventDetails.details}
          </Typography>
        </Box>
        {eventDetails.details && eventDetails.details.length > 50 && (
          <Box
            onClick={toggleShowMore}
            sx={{
              cursor: "pointer",
              color: "#C21010",
              fontSize: "13px",
              marginLeft: "0px",
              fontWeight: 600,
            }}
          >
            {showMore ? (
              <Box sx={{ display: "flex" }}>
                <KeyboardArrowDownIcon />
                Show less{" "}
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <KeyboardArrowUpIcon /> Show more
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Details;
