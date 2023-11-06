import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMobile ? "flex-start" : "space-between",
        borderTop: "1px solid grey",
        marginTop: "200px",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingTop: "10px",
        }}
      >
        <CopyrightIcon
          sx={{
            fontSize: "16px",
            color: "#C21010",
          }}
        />
        <Typography
          sx={{
            fontSize: "13px",
            color: "#C21010",
          }}
        >
          Santa Surprise. All Rights Reserved
        </Typography>
      </Box>
      <Box
        sx={{
          display: isMobile ? "flex" : "",
          flexDirection: isMobile ? "column" : "",
          justifyContent: isMobile ? "flex-start" : "",
          alignItems: isMobile ? "flex-start" : "",
        }}
      >
        <Button
          sx={{
            textTransform: "inherit",
            color: "#C21010",
            "&:hover": {
              cursor: "pointer",
              color: "skyblue",
              background: "transparent",
            },
          }}
        >
          Privacy policy
        </Button>
        <Button
          sx={{
            textTransform: "inherit",
            color: "#C21010",
            "&:hover": {
              cursor: "pointer",
              color: "skyblue",
              background: "transparent",
            },
          }}
        >
          Terms of use
        </Button>
        <Button
          sx={{
            textTransform: "inherit",
            color: "#C21010",
            "&:hover": {
              cursor: "pointer",
              color: "skyblue",
              background: "transparent",
            },
          }}
        >
          Desclaimer
        </Button>
        <Button
          sx={{
            textTransform: "inherit",
            color: "#C21010",
            "&:hover": {
              cursor: "pointer",
              color: "skyblue",
              background: "transparent",
            },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
}

export default Footer;
