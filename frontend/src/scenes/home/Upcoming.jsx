import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router";
import Santa from "./SantaImages.png";

function Upcoming({ upcomingEvents, isSmallScreen, userId }) {
  const navigate = useNavigate();
  return (
    <>
      {upcomingEvents.map((cardData, i) => (
        <Card
          sx={{
            width: isSmallScreen ? "250px" : 220,
            height: isSmallScreen ? "160px" : "230px",
            m: isSmallScreen ? "1rem" : "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            flexDirection: isSmallScreen ? "column" : "initial",
          }}
          key={i}
          onClick={() =>
            navigate(`/eventview?eventId=${cardData.eventId}&userId=${userId}`)
          }
        >
          <CardContent>
            <Box
              sx={{
                height: "60%",
              }}
            >
              <CardMedia
                component="img"
                image={Santa}
                alt="Image Description"
                sx={{
                  height: isSmallScreen ? "100%" : "100%",
                  width: isSmallScreen ? "40%" : "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Box>
            <Box
              sx={{
                borderTop: "1px solid #FFEAEA",
                height: "40%",
                width: "250px",
                background: "#FFEAEA",
                display: "flex",
                flexDirection: "column",
                padding: isSmallScreen ? "10px 20px" : "20px 30px",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "#C21010",
                  color: "white",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <CalendarMonthIcon
                  sx={{
                    fontSize: "17px",
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 16,
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                  variant="h6"
                  fontWeight="bold"
                >
                  {cardData.giftExchangeDate}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold">
                {cardData.eventName}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default Upcoming;
