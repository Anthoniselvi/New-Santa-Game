import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import React from "react";

function ButtonsTab({
  eventDetails,
  playerUserId,
  rsvpDate,
  setEditPage,
  setInvitePage,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {eventDetails.userId !== playerUserId ? null : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {rsvpDate ? (
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
                "&: disabled": {
                  color: "black",
                  border: "1px solid black",
                  background: "none",
                  opacity: 0.5,
                },
              }}
              onClick={() => setInvitePage(true)}
              disabled
            >
              {isSmallScreen ? (
                <ShareOutlinedIcon
                  sx={{
                    width: "16px",
                    height: "16px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <>
                  <ShareOutlinedIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Invite{" "}
                </>
              )}
            </Button>
          ) : (
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
              }}
              onClick={() => setInvitePage(true)}
            >
              {isSmallScreen ? (
                <ShareOutlinedIcon
                  sx={{
                    width: "16px",
                    height: "16px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <>
                  <ShareOutlinedIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Invite{" "}
                </>
              )}
            </Button>
          )}
          {rsvpDate ? (
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
                background: "#fafbfd",
                color: "#101a34",
                border: "1px solid #cad3dd",
                textTransform: "inherit",
                "&:hover": {
                  color: "#C21010",
                  border: "1px solid #C21010",
                },
                "&: disabled": {
                  color: "black",
                  border: "1px solid black",
                  background: "none",
                  opacity: 0.5,
                },
              }}
              disabled
            >
              {isSmallScreen ? (
                <EditCalendarOutlinedIcon
                  sx={{
                    width: "16px",
                    height: "16px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <>
                  <EditCalendarOutlinedIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Edit
                </>
              )}
            </Button>
          ) : (
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
                background: "#fafbfd",
                color: "#101a34",
                border: "1px solid #cad3dd",
                textTransform: "inherit",
                "&:hover": {
                  color: "#C21010",
                  border: "1px solid #C21010",
                },
              }}
              onClick={() => setEditPage(true)}
            >
              {isSmallScreen ? (
                <EditCalendarOutlinedIcon
                  sx={{
                    width: "16px",
                    height: "16px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <>
                  <EditCalendarOutlinedIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Edit
                </>
              )}
            </Button>
          )}
        </Box>
      )}{" "}
    </>
  );
}

export default ButtonsTab;
