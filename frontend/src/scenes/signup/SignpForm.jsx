import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";

function SignpForm({
  theme,
  handleSubmit,
  isSmallScreen,
  signupData,
  updateHandleChange,
  errors,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box>
          <Typography ml="1rem" mt="1.5rem" mb="0">
            Email
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              placeholder="Enter your Email"
              variant="outlined"
              sx={{
                ml: "1rem",
                width: isSmallScreen ? "80%" : "450px",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
              type="email"
              name="email"
              value={signupData.email}
              onChange={updateHandleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </ThemeProvider>
        </Box>

        <Box>
          <Typography ml="1rem" mt="1.5rem" mb="0">
            Password
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              placeholder="Create Password"
              variant="outlined"
              sx={{
                ml: "1rem",
                width: "450px",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
                width: isSmallScreen ? "80%" : "450px",
              }}
              type="password"
              name="password"
              value={signupData.password}
              onChange={updateHandleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </ThemeProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          mb="15px"
        >
          <Button
            variant="contained"
            sx={{
              border: "2px solid #C21010",
              borderRadius: "20px",
              width: isSmallScreen ? "80%" : "450px",
              fontSize: "1rem",
              color: "white",
              background: "#C21010",
              textTransform: "inherit",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#C21010",
                border: "1px solid #C21010",
              },
              marginTop: "10px",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default SignpForm;
