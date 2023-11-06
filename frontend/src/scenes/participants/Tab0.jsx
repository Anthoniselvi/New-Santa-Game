import { Avatar, Box, Button, Typography } from "@mui/material";

function Tab0({
  isSmallScreen,
  participantsData,
  setFirstName,
  setParticipantsId,
  setSecondName,
  setIsViewWishesOpen,
  productDetails,
}) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: "20px",
          lineHeight: "24px",
          marginBottom: "16px",
          fontWeight: 600,
          color: "#101a34",
          marginTop: isSmallScreen ? "20px" : 0,
        }}
      >
        Partcipating
      </Typography>
      {participantsData.map((participant, index) => (
        <Box
          key={index}
          sx={{
            borderBottom: "1px solid #e8ecf1",
            paddingBottom: "12px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: isSmallScreen ? "space-between" : "space-between",
            flexDirection: "row",
            width: isSmallScreen ? "100%" : "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box>
              <Avatar
                {...stringAvatar(`${participant.firstName}`)}
                sx={{
                  width: "26px",
                  height: "26px",
                  background: "#C21010",
                  fontSize: "11px",
                  marginBottom: 0,
                  lineHeight: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Box>
            <Box
              sx={{
                paddingLeft: "8px",
                flexBasis: "calc(100% - 26px)",
                maxWidth: "calc(100% - 26px)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  marginBottom: 0,
                }}
              >
                {participant.firstName}{" "}
                {participant.secondName ? participant.secondName : ""}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "11px",
                  lineHeight: "18px",
                  color: "#818694",
                }}
              >
                {participant.email}
              </Typography>
            </Box>
          </Box>
          <>
            <Button
              disabled={
                !productDetails[index] || productDetails[index].length === 0
              }
              sx={{
                margin: "0 5px",
                background: "#C21010",
                fontSize: isSmallScreen ? "10px" : "13px",
                color: "#fff",
                padding: isSmallScreen ? "5px 7px" : "14px 15px",
                border: "1px solid #C21010",
                fontWeight: 600,
                textTransform: "inherit",
                "&: hover": {
                  cursor: "pointer",
                  background: "#fff",
                  color: "#C21010",
                },
                borderRadius: "7px",
                "&: disabled": {
                  background: "#fff",
                  color: "grey",
                  border: "1px solid grey",
                  opacity: 0.5,
                },
              }}
              onClick={() => {
                setIsViewWishesOpen(true);
                console.log("Participants Id: ", participant.participantsId);
                setParticipantsId(participant.participantsId);
                setFirstName(participant.firstName);
                setSecondName(participant.secondName);
              }}
            >
              {isSmallScreen ? "view" : "View Wishes"}
            </Button>
          </>
        </Box>
      ))}{" "}
    </>
  );
}

export default Tab0;
