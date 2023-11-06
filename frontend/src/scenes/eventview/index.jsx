import React, { useContext, useEffect, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Invite from "../success/invite";
import EditEvent from "./editEvent";
import { MyContext, useDrawStatus } from "../../Components/MyContext";
import TabsList from "./tabsList";
import Santa from "./Santa";

function EventView() {
  const [eventDetails, setEventDetails] = useState({});
  const [name, setName] = useState([]);
  const [players, setPlayers] = useState([]);
  const [invitePage, setInvitePage] = useState(false);
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const playerUserId = searchParam.get("userId");
  const [editPage, setEditPage] = useState(false);
  const [drawnNames, setDrawnNames] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [receiver, setReceiver] = useState([]);
  const [participantsId, setParticipantsId] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [rsvpDate, setRsvpDate] = useState(false);
  const currentDate = new Date();
  const [giver, setGiver] = useState([]);
  const [eventDatePassed, setEventDatePassed] = useState(false);
  const { getDrawStatus, setDrawStatus } = useDrawStatus();
  const drawStatus = getDrawStatus(eventId);
  console.log("player user id: ", playerUserId);
  const { setIsLoggedIn } = useContext(MyContext);
  const [productDetails, setProductDetails] = useState([]);

  const handleEventEdit = (editedEventData) => {
    console.log("Edited event Data: ", editedEventData);
    const editedRsvpDate = new Date(editedEventData.rsvpDate);
    const isRSVPDatePassed = currentDate > editedRsvpDate;
    console.log("edited Rsvp Date passed: ", isRSVPDatePassed);
    setRsvpDate(isRSVPDatePassed);
    setEventDetails(editedEventData);
    setEditPage(false);
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/get/${eventId}`)
      .then((response) => {
        console.log("Get response: ", response);
        console.log("Get response data: ", response.data);
        setEventDetails(response.data);
        if (response.data.rsvpDate && currentDate) {
          const rsvpDate = new Date(response.data.rsvpDate);
          const isRSVPDatePassed = currentDate > rsvpDate;
          setRsvpDate(isRSVPDatePassed);
          console.log("rsvp passed: ", isRSVPDatePassed);
        }
        if (response.data.giftExchangeDate && currentDate) {
          const eventDate = new Date(response.data.giftExchangeDate);
          const isEventDatePassed = currentDate > eventDate;
          setEventDatePassed(isEventDatePassed);
          console.log("Event Date Passed: ", isEventDatePassed);
        }
        setIsButtonDisabled(response.data.drawNames);
        if (response.data.drawNames === true) {
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/user/get/${playerUserId}`)
            .then((res) => {
              console.log("User Name by userId: ", res.data);
              const userFullName =
                res.data.firstName +
                (res.data.secondName ? " " + res.data.secondName : "");

              // Filter drawnNames to find receiver and giver names
              const receiverFilteredNames = response.data.drawnNames.filter(
                (name) => name.giver === userFullName
              );
              const giverFilteredNames = response.data.drawnNames.filter(
                (name) => name.receiver === userFullName
              );

              // Update state if names are found
              if (receiverFilteredNames.length > 0) {
                console.log("Receiver: ", receiverFilteredNames[0].receiver);
                const receiverName = receiverFilteredNames[0].receiver;
                setReceiver(receiverName);
              }

              if (giverFilteredNames.length > 0) {
                console.log("Giver: ", giverFilteredNames[0].giver);
                const giverName = giverFilteredNames[0].giver;
                setGiver(giverName);
              }
            });
        }
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/user/${eventId}`)
      .then((response) => {
        console.log("User Name get response: ", response);
        console.log("user name get response data: ", response.data);
        setName(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/player/${eventId}`)
      .then((response) => {
        console.log("Participants List: ", response.data);
        setPlayers(response.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/player/id/${playerUserId}?eventId=${eventId}`
      )
      .then((response) => {
        console.log("ParticipantsId: ", response.data[0]);
        setParticipantsId(response.data[0]);
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/product/all/${response.data[0]}`
          )
          .then((res) => {
            console.log("Product Details: ", res.data);
            setProductDetails(res.data);
          });
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/get/${eventId}`)
      .then((response) => {
        console.log("Get response: ", response);
        console.log("Get response data: ", response.data);
        setEventDetails(response.data);
        setIsButtonDisabled(response.data.drawNames);
        if (response.data.drawNames === true) {
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/user/get/${playerUserId}`)
            .then((res) => {
              console.log("User Name by userId: ", res.data);
              const filteredNames = response.data.drawnNames.filter(
                (name) =>
                  name.giver ===
                  res.data.firstName +
                    (res.data.secondName ? " " + res.data.secondName : "")
              );
              console.log("filtered Names: ", filteredNames);
              if (filteredNames.length > 0) {
                console.log("Receiver: ", filteredNames[0].receiver);
                const receiverName = filteredNames[0].receiver;
                setReceiver(receiverName);
              }
            });
        }
      });
  }, [drawStatus]);

  const isDrawButtonVisible = rsvpDate && players.length >= 3;
  console.log("isButton is visibile: ", isDrawButtonVisible);

  const handleDrawNames = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/player/drawn/${eventId}`)
      .then((response) => {
        console.log("drawn names response: ", response.data);
        setDrawnNames(response.data);
        setDrawStatus(eventId, !drawStatus);
      });
  };

  return (
    <Box
      backgroundColor="#FFEAEA"
      width="100%"
      p={isSmallScreen ? "50px 12px 33px 12px" : "50px 30px 33px 30px"}
      minHeight="100vh"
    >
      <Santa
        eventDetails={eventDetails}
        playerUserId={playerUserId}
        rsvpDate={rsvpDate}
        setEditPage={setEditPage}
        setInvitePage={setInvitePage}
        isSmallScreen={isSmallScreen}
        isButtonDisabled={isButtonDisabled}
        handleDrawNames={handleDrawNames}
        name={name}
        isDrawButtonVisible={isDrawButtonVisible}
      />
      <TabsList
        eventId={eventId}
        playerUserId={playerUserId}
        players={players}
        receiver={receiver}
        eventDatePassed={eventDatePassed}
        giver={giver}
        participantsId={participantsId}
        productDetails={productDetails}
        setProductDetails={setProductDetails}
        eventDetails={eventDetails}
      />
      <Footer sx={{ marginTop: "auto" }} />
      <Invite
        open={invitePage}
        onClose={() => setInvitePage(false)}
        setInvitePage={setInvitePage}
        firstName={name.firstName}
        secondName={name.secondName}
        rsvpDate={eventDetails.rsvpDate}
        eventName={eventDetails.eventName}
        eventId={eventId}
        giftExchangeDate={eventDetails.giftExchangeDate}
        budget={eventDetails.budget}
      />
      <EditEvent
        open={editPage}
        onClose={() => setEditPage(false)}
        eventId={eventId}
        onEdit={handleEventEdit}
      />
    </Box>
  );
}

export default EventView;
