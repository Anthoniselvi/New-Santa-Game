import { Box } from "@mui/material";
import React from "react";
import EventName from "./EventName";
import Dates from "./Dates";
import Confirmation from "./Confirmation";
import NextButton from "./NextButton";

function CreateForm({
  theme,
  isSmallScreen,
  eventName,
  setEventName,
  errors,
  giftExchangeDate,
  setGiftExchangeDate,
  rsvpDate,
  setRsvpDate,
  confirmation,
  setConfirmation,
  moveToNextStep,
}) {
  return (
    <Box>
      <EventName
        theme={theme}
        eventName={eventName}
        setEventName={setEventName}
        errors={errors}
      />
      <Dates
        isSmallScreen={isSmallScreen}
        giftExchangeDate={giftExchangeDate}
        setGiftExchangeDate={setGiftExchangeDate}
        rsvpDate={rsvpDate}
        setRsvpDate={setRsvpDate}
        errors={errors}
        theme={theme}
      />
      <Confirmation
        isSmallScreen={isSmallScreen}
        confirmation={confirmation}
        setConfirmation={setConfirmation}
      />
      <NextButton
        isSmallScreen={isSmallScreen}
        moveToNextStep={moveToNextStep}
      />
    </Box>
  );
}

export default CreateForm;
