import React, { useContext, useEffect, useState } from "react";
import { Box, createTheme, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import { MyContext } from "../../Components/MyContext";
import Header from "./Header";
import CreateForm from "./CreateForm";
import TopBar from "./TopBar";

function EventCreation() {
  const [eventName, setEventName] = useState();
  const [giftExchangeDate, setGiftExchangeDate] = useState();
  const [rsvpDate, setRsvpDate] = useState();
  const [confirmation, setConfirmation] = useState();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState({});
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const navigate = useNavigate();
  const themes = useTheme();
  const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));
  const { setIsLoggedIn } = useContext(MyContext);

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

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/email/${userId}`)
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
      });
  }, []);

  const moveToNextStep = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!eventName) {
      validationErrors.eventName = "Event Name is required";
    }
    if (!giftExchangeDate) {
      validationErrors.giftExchangeDate = "Gift Exchange Date is required";
    }
    if (!rsvpDate) {
      validationErrors.rsvpDate = "RSVP Date Required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/event/add`, {
          eventName: eventName,
          giftExchangeDate: giftExchangeDate,
          rsvpDate: rsvpDate,
          confirmation: confirmation,
          userId: userId,
        })
        .then((response) => {
          console.log("post response: ", response);
          console.log("response data: ", response.data);
          if (response.data.confirmation === true) {
            axios
              .post(`${process.env.REACT_APP_BASE_URL}/player/post`, {
                participantsEmail: email,
                participantsAcceptence: "yes",
                eventId: response.data.eventId,
                userId: userId,
              })
              .then((res) => {
                console.log("Participants res: ", res.data);
                navigate(
                  `/budget?eventId=${response.data.eventId}&userId=${userId}`
                );
              });
          } else {
            navigate(
              `/budget?eventId=${response.data.eventId}&userId=${userId}`
            );
          }
        });
    }
  };

  return (
    <Box
      backgroundColor="#FFEAEA"
      width={isSmallScreen ? "100%" : "100vw"}
      p={isSmallScreen ? "48px 10px 40px" : "50px 30px 33px 30px"}
      color="#C21010"
    >
      <TopBar userId={userId} />
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
            width: isSmallScreen ? "100%" : "517px",
            margin: "0 auto",
            padding: "48px 10px 16px",
          }}
        >
          <Header />
          <CreateForm
            theme={theme}
            isSmallScreen={isSmallScreen}
            eventName={eventName}
            setEventName={setEventName}
            errors={errors}
            giftExchangeDate={giftExchangeDate}
            setGiftExchangeDate={setGiftExchangeDate}
            rsvpDate={rsvpDate}
            setRsvpDate={setRsvpDate}
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            moveToNextStep={moveToNextStep}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default EventCreation;
