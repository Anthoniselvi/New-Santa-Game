import { Box, TextField, ThemeProvider, Typography } from "@mui/material";

function Dates({
  isSmallScreen,
  giftExchangeDate,
  setGiftExchangeDate,
  rsvpDate,
  setRsvpDate,
  errors,
  theme,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Box width={isSmallScreen ? "100%" : "50%"}>
          <Typography
            sx={{
              fontFamily: "Poppins,sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#C21010",
              wordBreak: "break-all",
              marginLeft: "5px",
            }}
          >
            Gift exchange date:
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              type="date"
              sx={{
                width: "100%",
                background: "#fff",
                borderRadius: "7px",
                padding: "8px 15px",
                fontWeight: 400,
                fontSize: "1rem",
                color: "#C21010",
                lineHeight: "27px",
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                },
                marginLeft: "-12px",
              }}
              value={giftExchangeDate}
              onChange={(e) => setGiftExchangeDate(e.target.value)}
              error={!!errors.giftExchangeDate}
              helperText={errors.giftExchangeDate}
            />
          </ThemeProvider>
        </Box>
        <Box width={isSmallScreen ? "100%" : "50%"}>
          <Typography
            sx={{
              fontFamily: "Poppins,sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#C21010",
              marginLeft: "5px",
              wordBreak: "break-all",
            }}
          >
            RSVP Date:
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              type="date"
              sx={{
                width: "100%",
                background: "#fff",
                borderRadius: "7px",
                padding: "8px 15px",
                fontWeight: 400,
                fontSize: "1rem",
                color: "#C21010",
                lineHeight: "27px",
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                },
                marginLeft: "-12px",
              }}
              value={rsvpDate}
              onChange={(e) => setRsvpDate(e.target.value)}
              error={!!errors.rsvpDate}
              helperText={errors.rsvpDate}
            />
          </ThemeProvider>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: "18px",
            color: "#5e6577",
            color: "#C21010",
            margin: "6px 0px 0px 5px",
          }}
        >
          Names will be drawn the day after the RSVP deadline
        </Typography>
      </Box>
    </Box>
  );
}

export default Dates;
