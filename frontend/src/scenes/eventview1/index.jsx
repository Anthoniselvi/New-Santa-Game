import React, { useEffect, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Santa from "../eventview/Santa";
import YesOrNo from "./YesOrNo";

function EventView1() {
  const [eventDetails, setEventDetails] = useState([]);
  const [name, setName] = useState([]);
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/get/${eventId}`)
      .then((response) => {
        console.log("Get response: ", response);
        console.log("Get response data: ", response.data);
        setEventDetails(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/user/${eventId}`)
      .then((response) => {
        console.log("User Name get response: ", response);
        console.log("user name get response data: ", response.data);
        setName(response.data);
      });
  }, []);

  return (
    <Box
      backgroundColor="#FFEAEA"
      width="100vw"
      p="50px 30px 33px 30px"
      minHeight="100vh"
    >
      <Santa
        eventDetails={eventDetails}
        isSmallScreen={isSmallScreen}
        name={name}
      />
      <YesOrNo isSmallScreen={isSmallScreen} eventId={eventId} />
      <Footer />
    </Box>
  );
}

export default EventView1;
