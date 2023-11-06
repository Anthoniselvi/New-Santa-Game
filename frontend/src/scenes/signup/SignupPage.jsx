import { Box, Button, Typography } from "@mui/material";
import SignpForm from "./SignpForm";

function SignupPage({
  theme,
  handleSubmit,
  isSmallScreen,
  signupData,
  updateHandleChange,
  errors,
  handleClick,
}) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFEAEA",
        height: "85vh",
        width: isSmallScreen ? "100%" : "100vw",
        padding: isSmallScreen ? "20px" : "1.5rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
          border: "1px solid #C21010",
          borderRadius: "10px",
          width: isSmallScreen ? "100%" : "500px",
        }}
        color="#C21010"
        m="1.5rem 2.5rem"
      >
        <Box mt={1.5} ml={2.5}>
          <Typography variant="h5" fontWeight="bold" mb="15px">
            Sign up for Santa Surprise
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: "0.5",
              fontSize: "1rem",
            }}
          >
            It's quick and easy.
          </Typography>
        </Box>
        <SignpForm
          theme={theme}
          handleSubmit={handleSubmit}
          isSmallScreen={isSmallScreen}
          signupData={signupData}
          updateHandleChange={updateHandleChange}
          errors={errors}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>
            Already have an account?
            <Button
              sx={{
                textTransform: "inherit",
                fontSize: "1rem",
              }}
              onClick={handleClick}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupPage;
