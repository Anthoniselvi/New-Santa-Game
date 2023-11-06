import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function MsgBox({ isSmallScreen, theme, message, setMessage, messageSend }) {
  return (
    <Box
      sx={{
        marginBottom: "16px",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "13px",
          lineHeight: "18px",
          color: "#101a34",
          marginBottom: "5px",
          wordBreak: "break-all",
        }}
      >
        Send a message to the group
      </Typography>
      <Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: isSmallScreen ? "10px" : "initial",
        }}
      >
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="Enter your message text"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: isSmallScreen ? "100px" : "46px",
                padding: isSmallScreen ? "4px 7px" : "8px 15px",
                width: isSmallScreen ? "100%" : "800px",
                border: "1px solid #cad3dd",
              },
              background: "#fff",
              borderRadius: "7px",
              fontWeight: 400,
              fontSize: "16px",
              color: "#101a34",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </ThemeProvider>
        <Button
          variant="outlined"
          sx={{
            width: isSmallScreen ? "100%" : "155px",
            height: "46px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5px",
            textTransform: "inherit",
            color: "#fff",
            background: "#C12020",
            border: "2px solid #C21010",
            borderRadius: isSmallScreen ? "10px" : "5px",
            "&:hover": {
              background: "white",
              color: "#C21010",
              border: "2px solid #C21010",
            },
          }}
          onClick={messageSend}
        >
          <MailOutlineIcon />
          {isSmallScreen ? "Send" : "Send message"}
        </Button>
      </Box>
    </Box>
  );
}

export default MsgBox;
