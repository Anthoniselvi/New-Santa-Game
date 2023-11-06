import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Enter from "./Enter";

function ActiveTab0({ eventId, activeTab }) {
  const [yes, setYes] = useState();
  const [no, setNo] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [participantsId, setParticipantsId] = useState();

  const handleClick = () => {
    setShow(true);
    setYes("yes");
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/player/post`, {
        participantsAcceptence: "yes",
        eventId: eventId,
      })
      .then((response) => {
        console.log("participants response: ", response);
        console.log("participants response data: ", response.data);
        setParticipantsId(response.data.participantsId);
      });
  };

  const handleNo = () => {
    setNo("no");
    setShow1(true);
  };

  return (
    <>
      {show ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Enter eventId={eventId} participantsId={participantsId} />
        </Box>
      ) : (
        <Box>
          {activeTab === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                  width: "350px",
                  padding: "10px",
                  fontSize: "1rem",
                  color: "#0f7b9b",
                  background: "#fff",
                  textTransform: "inherit",
                  fontWeight: "bold",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "24px 16px 16px 16px",
                }}
              >
                {show1 ? (
                  <Box
                    sx={{
                      color: "#C21010",
                      textAlign: "center",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    Thanks for your response
                  </Box>
                ) : (
                  <Box>
                    <Typography
                      sx={{
                        color: "#101a34",
                        fontWeight: 600,
                        fontSize: "17px",
                        lineHeight: "22px",
                        textAlign: "center",
                        marginRight: "20px",
                        padding: "0 0 6px",
                      }}
                    >
                      You're invited!
                    </Typography>
                    <Typography
                      sx={{
                        color: "#101a34",
                        // fontWeight: 600,
                        fontSize: "17px",
                        lineHeight: "22px",
                        textAlign: "center",
                        marginRight: "20px",
                        padding: "0 0 6px",
                      }}
                    >
                      Would you like to particpate?
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        value={no}
                        onClick={handleNo}
                        sx={{
                          border: "2px solid #cad3dd",
                          borderRadius: "7px",
                          fontWeight: 600,
                          width: "48%",
                          fontSize: "1rem",
                          color: "#C21010",
                          background: "#fafbfd",
                          textTransform: "inherit",
                          "&:hover": {
                            backgroundColor: "#C21010",
                            color: "#fafbfd",
                            border: "1px solid #C21010",
                            cursor: "pointer",
                          },
                          marginTop: "10px",
                          lineHeight: "22px",
                        }}
                      >
                        No
                      </Button>
                      <Button
                        variant="contained"
                        value={yes}
                        onClick={handleClick}
                        sx={{
                          border: "2px solid #C21010",
                          borderRadius: "7px",
                          width: "48%",
                          fontSize: "1rem",
                          color: "white",
                          background: "#C21010",
                          textTransform: "inherit",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "#C21010",
                            border: "1px solid #0f7b9b",
                          },
                          marginTop: "10px",
                        }}
                      >
                        Yes
                      </Button>
                    </Box>{" "}
                  </Box>
                )}
              </Box>
            </Box>
          )}{" "}
        </Box>
      )}
    </>
  );
}

export default ActiveTab0;
