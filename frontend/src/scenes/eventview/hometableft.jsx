import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDrawStatus } from "../../Components/MyContext";

function HomeTabLeft({
  eventDetails,
  playerUserId,
  players,
  productDetails,
  eventId,
}) {
  const { getDrawStatus, setDrawStatus } = useDrawStatus();
  const drawStatus = getDrawStatus(eventId);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "48%",
        padding: "24px 16px",
        background: "#fff",
        border: "1px solid #e8ecf1",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: "20px",
          lineHeight: "25px",
          paddingBottom: "16px",
          marginBottom: "16px",
          borderBottom: "1px solid #e8ecf1",
          fontWeight: "bold",
        }}
      >
        Your gift exchange checklist
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        {eventDetails.userId !== playerUserId ? null : (
          <Typography
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "10px",
              fontSize: isSmallScreen ? "12px" : "initial",
            }}
          >
            {players.length <= 2 ? (
              <CancelOutlinedIcon
                sx={{
                  color: "red",
                  width: "18px",
                  height: "18px",
                }}
              />
            ) : (
              <CheckCircleOutlineIcon
                sx={{
                  color: "green",
                  width: "18px",
                  height: "18px",
                }}
              />
            )}
            At least 3 participants joined
          </Typography>
        )}
        <Typography
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "10px",
            fontSize: isSmallScreen ? "12px" : "initial",
          }}
        >
          {eventDetails.userId !== playerUserId ? (
            <>
              {!eventDetails.drawNames ? (
                <CancelOutlinedIcon
                  sx={{
                    color: "red",
                    width: "18px",
                    height: "18px",
                  }}
                />
              ) : (
                <CheckCircleOutlineIcon
                  sx={{
                    color: "green",
                    width: "18px",
                    height: "18px",
                  }}
                />
              )}{" "}
            </>
          ) : (
            <>
              {" "}
              {drawStatus === false ? (
                <CancelOutlinedIcon
                  sx={{
                    color: "red",
                    width: "18px",
                    height: "18px",
                  }}
                />
              ) : (
                <CheckCircleOutlineIcon
                  sx={{
                    color: "green",
                    width: "18px",
                    height: "18px",
                  }}
                />
              )}
            </>
          )}
          Name to be drawn by the organizer
        </Typography>
        <Typography
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "10px",
            fontSize: isSmallScreen ? "12px" : "initial",
          }}
        >
          {productDetails.length === 0 ? (
            <CancelOutlinedIcon
              sx={{
                color: "red",
                width: "18px",
                height: "18px",
              }}
            />
          ) : (
            <CheckCircleOutlineIcon
              sx={{
                color: "green",
                width: "18px",
                height: "18px",
              }}
            />
          )}
          Add to your wish list
        </Typography>
      </Box>
    </Box>
  );
}

export default HomeTabLeft;
