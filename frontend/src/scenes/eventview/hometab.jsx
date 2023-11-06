import { Box, useTheme, useMediaQuery } from "@mui/material";
import HomeTabLeft from "./hometableft";
import HomeTabRight from "./hometabright";

function HomeTab({
  eventId,
  playerUserId,
  players,
  productDetails,
  receiver,
  giver,
  eventDatePassed,
  eventDetails,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        padding: "15px 0",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: isSmallScreen ? "column" : "row",
        gap: isSmallScreen ? "10px" : 0,
      }}
    >
      <HomeTabLeft
        eventDetails={eventDetails}
        playerUserId={playerUserId}
        players={players}
        productDetails={productDetails}
        eventId={eventId}
      />
      <HomeTabRight
        eventDatePassed={eventDatePassed}
        eventDetails={eventDetails}
        receiver={receiver}
        giver={giver}
      />
    </Box>
  );
}

export default HomeTab;
