import React, { useContext, useEffect, useState } from "react";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Footer from "../../Components/Footer";
import axios from "axios";
import { MyContext } from "../../Components/MyContext";
import Success1 from "./Success1";

function Success() {
  const [eventDetails, setEventDetails] = useState([]);
  const [user, setUser] = useState([]);
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const eventId = searchParam.get("eventId");
  const [invitePage, setInvitePage] = useState(true);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(MyContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    navigate(`/home?userId=${userId}`);
  };

  const moveToEventview = () => {
    navigate(`/eventview?eventId=${eventId}&userId=${userId}`);
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/get/${eventId}`)
      .then((response) => {
        console.log("Success Event Details: ", response.data);
        setEventDetails(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/user/${eventId}`)
      .then((response) => {
        const userFullName =
          response.data.firstName +
          (response.data.secondName ? " " + response.data.secondName : "");

        setUser(userFullName);
      });
  }, []);

  return (
    <Box backgroundColor="#FFEAEA" width="100vw" p="50px 30px 33px 30px">
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
          Santa Surprise
        </Button>
      </Box>
      <Success1
        moveToEventview={moveToEventview}
        eventDetails={eventDetails}
        user={user}
        eventId={eventId}
        setInvitePage={setInvitePage}
        isSmallScreen={isSmallScreen}
      />
      <Footer />
    </Box>
  );
}

export default Success;
