import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/Footer";
import { MyContext } from "../../Components/MyContext";
import "../../App.css";
import Past from "./Past";
import HomeTab0 from "./HomeTab0";
import TabContent from "./TabContent";

function Home() {
  const [eventData, setEventData] = useState([]);
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const { setIsLoggedIn } = useContext(MyContext);
  const currentDate = new Date();
  const dates = eventData.map((event) => event.giftExchangeDate);
  console.log("dates: ", dates);
  const [activeTab, setActiveTab] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [userName, setUserName] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const upcoming = eventData.filter((event) => {
      const eventDate = new Date(event.giftExchangeDate);
      return currentDate < eventDate;
    });
    console.log("upcoming: ", upcoming);
    const past = eventData.filter((event) => {
      const eventDate = new Date(event.giftExchangeDate);
      return currentDate > eventDate;
    });
    console.log("past: ", past);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [eventData]);

  const comparisonResults = dates.map((date) => {
    const eventDate = new Date(date);
    const isCurrentDateBeforeEventDate = currentDate > eventDate;
    const isCurrentDateAfterEventDate = currentDate < eventDate;
    const areDatesEqual = currentDate.getTime() === eventDate.getTime();
    console.log("isCurrentDateBeforeEventDate: ", isCurrentDateBeforeEventDate);
    console.log("isCurrentDateAfterEventDate: ", isCurrentDateAfterEventDate);

    return {
      date: eventDate.toDateString(),
      isCurrentDateBeforeEventDate,
      isCurrentDateAfterEventDate,
      areDatesEqual,
    };
  });
  console.log("comparision results: ", comparisonResults);

  const afterEventDateCount = comparisonResults.filter(
    (result) => result.isCurrentDateAfterEventDate
  ).length;

  const beforeEventDateCount = comparisonResults.filter(
    (result) => result.isCurrentDateBeforeEventDate
  ).length;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/player/${userId}/event`)
      .then((response) => {
        console.log("dashboard response: ", response);
        setEventData(response.data);
      })
      .catch((err) => console.log("Error: ", err));
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/get/${userId}`)
      .then((res) => {
        console.log("User Name by userId: ", res.data);
        const userFullName =
          res.data.firstName +
          (res.data.secondName ? " " + res.data.secondName : "");
        console.log("user Name: ", userFullName);
        setUserName(userFullName);
      });
  }, []);

  const getAvatarContent = () => {
    if (typeof userName === "string" && userName.length > 0) {
      return userName.charAt(0);
    }
    return "";
  };

  return (
    <Box
      backgroundColor="#FFEAEA"
      width="100vw"
      p="50px 30px 33px 30px"
      minHeight="100vh"
      sx={{
        overflowY: "hidden",
      }}
    >
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: "25px",
              color: "#C21010",
              wordBreak: "break-word",
              display: { xs: "none", md: "block" },
              marginBottom: "10px",
            }}
          >
            Welcome {userName}!
          </Typography>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              backgroundColor: "#C21010",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: "18px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            {getAvatarContent()}
          </Box>
        </Box>
        <TabContent
          afterEventDateCount={afterEventDateCount}
          beforeEventDateCount={beforeEventDateCount}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === 0 && (
          <HomeTab0
            upcomingEvents={upcomingEvents}
            isSmallScreen={isSmallScreen}
            userId={userId}
          />
        )}
        {activeTab === 1 ? (
          <Past
            isSmallScreen={isSmallScreen}
            pastEvents={pastEvents}
            userId={userId}
          />
        ) : null}
      </>
      <Footer sx={{ marginTop: "auto" }} />
    </Box>
  );
}

export default Home;
