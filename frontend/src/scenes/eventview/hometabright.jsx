import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Mail from "./mail12.svg";
import Gift from "./gift12.svg";
import Santa1 from "./santa12.svg";

function HomeTabRight({ eventDetails, eventDatePassed, receiver, giver }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "50%",
        padding: "24px 16px",
        background: "#fff",
        border: "1px solid #e8ecf1",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          paddingBottom: "16px",
          marginBottom: "16px",
          borderBottom: "1px solid #e8ecf1",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexBasis: "calc(100% - 134px)",
            maxWidth: "calc(100% - 134px)",
            fontSize: "13px",
            lineHeight: "18px",
            color: "#5e6577",
            display: "flex",
          }}
        >
          <img
            src={Mail}
            style={{ filter: "hue-rotate(180deg)", paddingRight: "10px" }}
          />
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "13px",
                color: "#101a34",
                wordBreak: "break-all",
              }}
            >
              RSVP Status:
            </Typography>
            {eventDetails.confirmation === true ? (
              <>
                <Typography
                  sx={{
                    marginBottom: 0,
                    fontSize: "13px",
                  }}
                >
                  Participating
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    marginBottom: 0,
                    fontSize: "13px",
                  }}
                >
                  Not Participating
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {eventDetails.confirmation === true ? (
        <>
          <Box
            sx={{
              paddingBottom: "16px",
              marginBottom: "16px",
              borderBottom: "1px solid #e8ecf1",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                fontSize: "13px",
                lineHeight: "18px",
                color: "#5e6577",
                display: "flex",
              }}
            >
              <img
                src={Gift}
                style={{
                  paddingRight: "10px",
                  filter: "hue-rotate(180deg)",
                }}
              />
              <Box>
                <Typography
                  sx={{
                    marginBottom: "2px",
                    fontWeight: 600,
                    fontSize: "13px",
                    lineHeight: "18px",
                    color: "#101a34",
                    wordBreak: "break-all",
                  }}
                >
                  You're giving to:
                </Typography>
                <Typography
                  sx={{
                    marginBottom: 0,
                    fontSize: "13px",
                  }}
                >
                  {eventDetails.drawNames === true ? (
                    <> {receiver} </>
                  ) : (
                    <>
                      Check back after the draw date on {eventDetails.rsvpDate}
                    </>
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              paddingBottom: "16px",
              marginBottom: "16px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                // flexBasis: "calc(100% - 134px)",
                // maxWidth: "calc(100% - 134px)",
                fontSize: "13px",
                lineHeight: "18px",
                color: "#5e6577",
                display: "flex",
              }}
            >
              <img
                src={Santa1}
                style={{
                  paddingRight: "10px",
                  filter: "hue-rotate(180deg)",
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#101a34",
                    wordBreak: "break-all",
                  }}
                >
                  Your gift giver:
                </Typography>
                {eventDatePassed ? (
                  <>{giver}</>
                ) : (
                  <Typography
                    sx={{
                      marginBottom: 0,
                      fontSize: "13px",
                    }}
                  >
                    Your gift giver will be revealed after the gift exchange
                    date set by the event organizer on{" "}
                    {eventDetails.giftExchangeDate}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>{" "}
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default HomeTabRight;
