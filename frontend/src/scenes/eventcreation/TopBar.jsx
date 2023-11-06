import { Box, Button } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useNavigate } from "react-router";

function TopBar({ userId }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/home?userId=${userId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
      }}
      onClick={handleClick}
    >
      <ArrowCircleLeftOutlinedIcon
        sx={{
          fontSize: "1.2rem",
          color: "#C21010",
        }}
      />
      <Button
        sx={{
          textTransform: "inherit",
          color: "#C21010",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Home
      </Button>
    </Box>
  );
}

export default TopBar;
