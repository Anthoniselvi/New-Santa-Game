import { Box, Button } from "@mui/material";

function NextButton({ moveToNextStep, isSmallScreen }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        onClick={moveToNextStep}
        variant="contained"
        sx={{
          border: "2px solid #C21010",
          borderRadius: "10px",
          width: isSmallScreen ? "45%" : "50%",
          fontSize: "1rem",
          color: "#FFF",
          background: "#C21010",
          textTransform: "inherit",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#C21010",
            border: "1px solid #C21010",
          },
          marginTop: "10px",
          marginLeft: "5px",
        }}
      >
        Next step
      </Button>
    </Box>
  );
}

export default NextButton;
