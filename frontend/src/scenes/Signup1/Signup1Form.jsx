import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";

function Signup1Form({
  theme,
  firstName,
  secondName,
  setFirstName,
  setSecondName,
  birthDay,
  setBirthDay,
  handleClick,
  handleSubmit,
  errors,
}) {
  return (
    <Box
      m="1.5rem 2.5rem"
      color="#C21010"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        border: "1px solid grey",
        width: "350px",
        borderRadius: "10px",
      }}
    >
      <Box m="1.5rem">
        <Typography>First Name</Typography>
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="Enter First Name"
            sx={{
              width: "250px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </ThemeProvider>
      </Box>
      <Box m="1.5rem">
        <Typography>Last Name</Typography>
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="Enter Second Name"
            sx={{
              width: "250px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
            type="text"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
        </ThemeProvider>
      </Box>
      <Box m="1.5rem">
        <Typography>BirthDay</Typography>
        <ThemeProvider theme={theme}>
          <TextField
            type="date"
            sx={{
              width: "250px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            error={!!errors.birthDay}
            helperText={errors.birthDay}
          />
        </ThemeProvider>
      </Box>
      <Box m="1.5rem">
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            border: "2px solid #C21010",
            borderRadius: "20px",
            width: "250px",
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
          }}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Typography>
          Already have an account?
          <Button
            onClick={handleClick}
            sx={{
              textTransform: "inherit",
              "&:hover": {
                backgroundColor: "#D8D8D8",
                color: "#C21010",
                border: "1px solid #C21010",
              },
            }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup1Form;
