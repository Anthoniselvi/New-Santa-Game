import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";

function MsgDisplay({ messageDetails }) {
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }
  const reversedMessageDetails = [...messageDetails].reverse();
  return (
    <>
      {reversedMessageDetails.map((singleDetail, i) => (
        <Grid
          container
          alignItems="stretch"
          sx={{
            padding: "10px 5px",
            background: "#fff",
            border: "1px solid #e8ecf1",
            borderRadius: "9px",
            marginBottom: "10px",
          }}
          key={i}
        >
          <Grid item xs={6} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                Width: "50%",
                paddingRight: "20px",
              }}
            >
              <Avatar
                {...stringAvatar(`${singleDetail.senderDetails.firstName}`)}
                sx={{
                  width: "20px",
                  height: "20px",
                  background: "#C21010",
                  fontSize: "10px",
                  marginBottom: 0,
                  lineHeight: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "12px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "22px",
                    color: "#101a34",
                    marginBottom: "4px",
                  }}
                >
                  {singleDetail.senderDetails.firstName}{" "}
                  {singleDetail.senderDetails.secondName}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box
              sx={{
                flexBasis: "45%",
                display: "flex",
                maxWidth: "100%",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "10px",
                    lineHeight: "16px",
                    color: "#5e6577",
                    marginBottom: "3px",
                  }}
                >
                  {formatDate(singleDetail.timeStamp)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                padding: "20px 5px",
                fontSize: "14px",
                lineHeight: "22px",
                color: "#5e6577",
                flexBasis: "100%",
                maxWidth: "100%",
                marginTop: "20px",
                borderTop: "1px solid #e8ecf1",
              }}
            >
              <Typography variant="body1">{singleDetail.message}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default MsgDisplay;
