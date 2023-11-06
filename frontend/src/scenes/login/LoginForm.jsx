import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

function LoginForm({
  isSmallScreen,
  handleLogin,
  theme,
  loginData,
  handleChange,
  errors,
  handleClickPassword,
  handleSignup,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
        border: "1px solid #C21010",
        width: isSmallScreen ? "100%" : "500px",
        borderRadius: "10px",
      }}
      color="black"
      m="1.5rem 2.5rem"
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
          Login to Santa Surprise
        </Typography>
      </Box>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box>
            <Typography
              ml="1rem"
              mt="1.5rem"
              mb="0"
              sx={{
                color: "#C21010",
              }}
            >
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
                value={loginData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </ThemeProvider>
          </Box>
          <Box>
            <Typography
              ml="1rem"
              mt="1.5rem"
              mb="0"
              sx={{
                color: "#C21010",
              }}
            >
              Password
            </Typography>
            <ThemeProvider theme={theme}>
              <TextField
                placeholder="Enter your Password"
                variant="outlined"
                sx={{
                  ml: "1rem",
                  width: isSmallScreen ? "80%" : "450px",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                  },
                }}
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
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
            mt="1rem"
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
                  backgroundColor: "#FFF",
                  color: "#C21010",
                  border: "1px solid #C21010",
                },
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            textTransform: "inherit",
            fontSize: "1rem",
            color: "red",
          }}
          onClick={handleClickPassword}
        >
          Forgot Password?
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>
          Need to create an account?
          <Button
            sx={{
              textTransform: "inherit",
              fontSize: "1rem",
            }}
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
