import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import copy from "copy-to-clipboard";

function CopyInvitation({
  firstName,
  rsvpDate,
  eventName,
  eventId,
  setInvitePage,
  secondName,
  giftExchangeDate,
  budget,
}) {
  const [copyText, setCopyText] = useState("");
  const textFieldRef = useRef(null);
  const themes = useTheme();
  const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));
  const userName = `${firstName} ${secondName ? secondName : ""}`;
  const [show, setShow] = useState(true);
  console.log("Gift exchange date: ", giftExchangeDate);
  console.log("budget: ", budget);

  const copyToClipboard = () => {
    copy(textFieldRef.current.defaultValue);
    setCopyText(textFieldRef.current.defaultValue);
    setShow(false);
    setInvitePage(false);
  };
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px solid #C21010",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "2px solid #C21010",
              },
            },
          },
        },
      },
    },
  });

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "initial",
        maxWidth: "600px",
        overflow: "hidden",
        whiteSpace: "pre-wrap",
      }}
    >
      <ThemeProvider theme={theme}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={isSmallScreen ? "12" : "7"}
          inputRef={textFieldRef}
          defaultValue={`We're going to draw names for ${eventName}! Make a wish list and draw a name so that everyone has time to buy a gift.
Date of the gift exchange: ${giftExchangeDate}
Gift amount:  ₹ ${budget}
click on the link to join 
https://main.d2ox3js0flnzdp.amplifyapp.com/eventview1?eventId=${eventId}`}
          sx={{ width: "100%", minWidth: "none" }}
        />
      </ThemeProvider>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {show ? (
          <Button
            onClick={copyToClipboard}
            variant="outlined"
            sx={{
              border: "1px solid #C21010",
              width: isSmallScreen ? "50%" : "200px",
              borderRadius: "10px",
              textTransform: "inherit",
              marginBottom: "5px",
              color: "#C21010",
              background: "#fff",
              fontWeight: "bold",
              marginTop: "5px",
            }}
          >
            Copy
          </Button>
        ) : (
          <Button
            onClick={copyToClipboard}
            variant="outlined"
            sx={{
              border: "1px solid #C21010",
              width: isSmallScreen ? "50%" : "200px",
              borderRadius: "10px",
              textTransform: "inherit",
              marginBottom: "5px",
              color: "#C21010",
              background: "#fff",
              fontWeight: "bold",
              marginTop: "5px",
            }}
          >
            Invitation Copied
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default CopyInvitation;
