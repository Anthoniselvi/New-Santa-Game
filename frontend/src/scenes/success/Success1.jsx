import { Box, Button, Typography } from "@mui/material";
import CopyInvitation from "../copyinvitation";
import Light from "./bell.png";

function Success1({
  moveToEventview,
  eventDetails,
  user,
  eventId,
  setInvitePage,
  isSmallScreen,
}) {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "#fff",
        border: "1px solid #FFEAEA",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          maxWidth: "517px",
          margin: "0 auto",
          padding: "48px 10px 16px",
        }}
      >
        <Box
          sx={{
            paddingBottom: "28px",
            marginBottom: "28px",
            borderBottom: "1px solid #cad3dd",
            textAlign: "center",
          }}
        >
          <img
            src={Light}
            alt="Light image"
            height={150}
            width={125}
            className="starimage"
          />
          <Typography
            variant="h4"
            color="#C21010"
            sx={{
              fontWeight: 600,
              fontSize: isSmallScreen ? "20px" : "30px",
            }}
          >
            Your event has been created!
          </Typography>
          <Typography
            color="#C21010"
            sx={{
              margin: "0 0 10px",
            }}
          >
            Santa Surprises need at least 3 participants
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={moveToEventview}
            variant="contained"
            sx={{
              border: "2px solid #C21010",
              borderRadius: "10px",
              width: "100%",
              fontSize: "1rem",
              color: "white",
              background: "#C21010",
              textTransform: "inherit",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "white",
                color: "#C21010",
                border: "1px solid #C21010",
              },
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            View Santa Surprise
          </Button>
        </Box>
        <Box></Box>
        <Box
          sx={{
            borderRadius: "10px",
            width: "100%",
            fontSize: "1rem",
            color: "#C21010",
            textTransform: "inherit",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          {eventDetails.eventName &&
          eventDetails.giftExchangeDate &&
          eventDetails.budget ? (
            <CopyInvitation
              eventName={eventDetails.eventName}
              firstName={user}
              rsvpDate={eventDetails.rsvpDate}
              eventId={eventId}
              setInvitePage={setInvitePage}
              giftExchangeDate={eventDetails.giftExchangeDate}
              budget={eventDetails.budget}
            />
          ) : (
            <div>Loading event details...</div>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "5px solid #C21010",
          paddingBottom: "20px",
        }}
      ></Box>
    </Box>
  );
}

export default Success1;
