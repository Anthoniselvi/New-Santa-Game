import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { auth } from "../firebase";
import { MyContext } from "./MyContext";
import Navbar from "./Navbar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { sendPasswordResetEmail } = useContext(MyContext);

  const themes = useTheme();
  const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "grey",
              },
            },
          },
        },
      },
    },
  });

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetError(null);
      setResetSuccess(true);
      setEmail("");
    } catch (error) {
      setResetError(error.message);
      setResetSuccess(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#FFEAEA",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: isSmallScreen ? "100%" : "100vw",
          padding: isSmallScreen ? "20px" : "1.5rem 2.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            border: "1px solid #CFE8A9",
            width: isSmallScreen ? "100%" : "500px",
            borderRadius: "10px",
            height: "300px",
          }}
          color="black"
          m="1rem 2.5rem"
        >
          <Box mt={1.5} ml={2.5}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb="15px"
              sx={{
                color: "#C21010",
              }}
            >
              Reset Password
            </Typography>
          </Box>
          <Box>
            <Typography
              ml="1rem"
              mt="1.5rem"
              mb="1rem"
              sx={{
                color: "#C21010",
              }}
            >
              Enter your email address to receive a password reset link.
            </Typography>
            <ThemeProvider theme={theme}>
              <TextField
                sx={{
                  ml: "1rem",
                  width: isSmallScreen ? "80%" : "450px",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                  },
                }}
                placeholder="Enter your email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={resetError !== null}
                helperText={
                  resetError ||
                  (resetSuccess ? "Password reset email sent!" : "")
                }
              />
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            mb="15px"
            mt="1rem"
          >
            <Button
              variant="contained"
              sx={{
                border: "2px solid #C21010",
                borderRadius: "20px",
                width: isSmallScreen ? "60%" : "200px",
                fontSize: "1rem",
                color: "white",
                background: "#C21010",
                textTransform: "inherit",
                fontWeight: "bold",
                margin: "5px 15px",
                "&:hover": {
                  backgroundColor: "#FFF",
                  color: "#C21010",
                  border: "1px solid #C21010",
                },
              }}
              onClick={handleForgotPassword}
            >
              Send Reset Link
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
