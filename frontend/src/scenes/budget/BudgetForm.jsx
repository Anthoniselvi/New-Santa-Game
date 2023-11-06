import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

function BudgetForm({
  handleSubmit,
  budget,
  setBudget,
  details,
  setdetails,
  errors,
  isSmallScreen,
}) {
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#cad3dd",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "#cad3dd",
              },
            },
          },
        },
      },
    },
  });
  return (
    <Box>
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
            marginLeft: "15px",
          }}
        >
          Spending limit per gift
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="Enter Min Budget"
            sx={{
              width: "100%",
              background: "#fff",
              borderRadius: "7px",
              padding: "8px 15px",
              fontWeight: 400,
              fontSize: "1rem",
              color: "#101a34",
              lineHeight: "27px",
              "& .MuiOutlinedInput-root": {
                height: "44px",
              },
              marginLeft: "0px",
            }}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            error={!!errors.budget}
            helperText={errors.budget}
          />
        </ThemeProvider>
      </Box>
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
            marginLeft: "15px",
          }}
        >
          Other details(Optional)
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="Enter your text"
            multiline
            rows={4}
            sx={{
              width: isSmallScreen ? "90%" : "95%",
              marginLeft: "15px",
            }}
            value={details}
            onChange={(e) => setdetails(e.target.value)}
          />
        </ThemeProvider>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            border: "2px solid #C21010",
            borderRadius: "10px",
            width: isSmallScreen ? "45%" : "50%",
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
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default BudgetForm;
