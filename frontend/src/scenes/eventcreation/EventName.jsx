import { Box, TextField, ThemeProvider, Typography } from "@mui/material";

function EventName({ theme, eventName, setEventName, errors }) {
  return (
    <Box
      sx={{
        marginBottom: "20px",
      }}
    >
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
        Event Name
      </Typography>
      <ThemeProvider theme={theme}>
        <TextField
          placeholder="Enter event name"
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
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          error={!!errors.eventName}
          helperText={errors.eventName}
        />
      </ThemeProvider>
    </Box>
  );
}

export default EventName;
