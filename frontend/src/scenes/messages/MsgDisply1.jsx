import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function MsgDisply1({ messageDetails }) {
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 16px",
            background: "#fff",
            border: "1px solid #e8ecf1",
            borderRadius: "9px",
          }}
          key={i}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "30%",
              paddingRight: "20px",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              {...stringAvatar(`${singleDetail.senderDetails.firstName}`)}
              sx={{
                width: "26px",
                height: "26px",
                background: "#C21010",
                fontSize: "11px",
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
                  fontSize: "17px",
                  fontWeight: 600,
                  lineHeight: "22px",
                  color: "#101a34",
                  marginBottom: "4px",
                }}
              >
                {singleDetail.senderDetails.firstName}{" "}
                {singleDetail.senderDetails.secondName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#818694",
                }}
              >
                {singleDetail.senderDetails.email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              borderRight: "1px solid #e8ecf1",
              borderLeft: "1px solid #e8ecf1",
              padding: "0 20px",
              fontSize: "17px",
              lineHeight: "140%",
              color: "#5e6577",
              flexBasis: "50%",
              maxWidth: "45%",
            }}
          >
            <Typography variant="body1">{singleDetail.message}</Typography>
          </Box>
          <Box
            sx={{
              flexBasis: "20%",
              maxWidth: "30%",
              paddingLeft: "20px",
              textAlign: "right",
              display: "flex",
            }}
          >
            <Box sx={{ width: "150px" }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#5e6577",
                  marginBottom: "7px",
                }}
              >
                {formatDate(singleDetail.timeStamp)}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default MsgDisply1;
