import React, { useEffect, useState } from "react";
import { Box, createTheme, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import MsgBox from "./MsgBox";
import MsgDisplay from "./MsgDisplay";
import MsgDisply1 from "./MsgDisply1";

function Messages({ eventId, userId }) {
  const [userDetails, setUserDetails] = useState([]);
  const [messageDetails, setMessageDetails] = useState([]);
  const [message, setMessage] = useState();
  const [participantsId, setParticipantsId] = useState(0);
  const themes = useTheme();
  const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/player/id/${userId}?eventId=${eventId}`
      )
      .then((response) => {
        console.log("ParticipantsId: ", response.data[0]);
        setParticipantsId(response.data[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/msg/all/${eventId}`)
      .then((response) => {
        const userPromises = response.data.map((message) => {
          return axios.get(
            `${process.env.REACT_APP_BASE_URL}/user/get/${message.userId}`
          );
        });

        Promise.all(userPromises)
          .then((userResponses) => {
            const users = userResponses.map((res) => res.data);
            setUserDetails(users);
            const joinData = response.data.map((message, index) => ({
              ...message,
              senderDetails: users[index],
            }));
            console.log("Message  response data: ", joinData);
            setMessageDetails(joinData);
          })
          .catch((error) => {
            console.error("Error fetching user details: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching messages: ", error);
      });
  }, [eventId]);

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#cad3dd",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "#cad3dd",
              },
            },
          },
        },
      },
    },
  });

  const messageSend = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/msg/add`, {
        message: message,
        userId: userId,
        eventId: eventId,
        participantsId: participantsId,
      })
      .then((response) => {
        console.log("Message send response: ", response.data);
        setMessage("");
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/user/get/${userId}`)
          .then((senderResponse) => {
            const newMessageDetail = {
              ...response.data,
              senderDetails: senderResponse.data,
            };
            setMessageDetails((prevMessageDetails) => [
              ...prevMessageDetails,
              newMessageDetail,
            ]);
          })
          .catch((error) => {
            console.error("Error fetching sender details: ", error);
          });
      })
      .catch((error) => {
        console.error("Error sending message: ", error);
      });
  };

  return (
    <Box
      sx={{
        padding: "15px 0",
        minHeight: "100vh",
      }}
    >
      <MsgBox
        isSmallScreen={isSmallScreen}
        theme={theme}
        message={message}
        setMessage={setMessage}
        messageSend={messageSend}
      />
      {isSmallScreen ? (
        <MsgDisplay messageDetails={messageDetails} />
      ) : (
        <MsgDisply1 messageDetails={messageDetails} />
      )}
    </Box>
  );
}

export default Messages;
