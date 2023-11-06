import { Box, Typography } from "@mui/material";
import Star from "./star2.png";

function Header() {
  return (
    <Box
      sx={{
        paddingBottom: "28px",
        marginBottom: "28px",
        borderBottom: "1px solid #cad3dd",
        textAlign: "center",
      }}
    >
      <img
        src={Star}
        alt="star image"
        height={100}
        width={100}
        className="starimage"
        style={{
          background: "transparent",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          margin: "0 0 20px",
          fontWeight: 600,
          fontSize: "30px",
          lineHeight: "28px",
        }}
      >
        Let's get started
      </Typography>
    </Box>
  );
}

export default Header;
