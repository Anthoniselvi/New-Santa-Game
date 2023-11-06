import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function Confirmation({ isSmallScreen, setConfirmation, confirmation }) {
  return (
    <Box
      sx={{
        width: "600px",
        marginBottom: "20px",
      }}
    >
      <FormControl>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "18px",
            color: "#C21010",
            marginBottom: "5px",
            wordBreak: "break-all",
            marginLeft: "5px",
          }}
        >
          Are you participating?
        </FormLabel>
        <RadioGroup
          sx={{
            display: "flex",
            width: "100%",
            gap: "10px",
            marginLeft: "10px",
            alignItems: isSmallScreen ? "center" : "initial",
            padding: "8px",
          }}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        >
          <FormControlLabel
            value="true"
            control={
              <Radio sx={{ alignSelf: "center" }} className="custom-radio" />
            }
            label="Yes"
            sx={{
              width: isSmallScreen ? "140px" : "225px",
              border: "1px solid #cad3dd",
              borderRadius: "7px",
              fontSize: "0.8rem",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <FormControlLabel
            value="false"
            control={
              <Radio sx={{ alignSelf: "center" }} className="custom-radio" />
            }
            label="No"
            sx={{
              width: isSmallScreen ? "140px" : "225px",
              border: "1px solid #cad3dd",
              borderRadius: "7px",
              textAlign: "center",
              fontSize: "0.8rem",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default Confirmation;
