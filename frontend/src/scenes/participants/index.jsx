import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Tick from "./tickic.svg";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import ViewWishes from "./view";
import Tab0 from "./Tab0";

function Participants() {
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const [participantsList, setParticipantsList] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState([]);
  const [isViewWishesOpen, setIsViewWishesOpen] = useState(false);
  const [participantsId, setParticipantsId] = useState();
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/player/${eventId}`)
      .then((response) => {
        console.log("Get participants response: ", response);
        console.log("Get participants response data: ", response.data);
        const filteredParticipantsList = response.data.filter((participant) =>
          participant.participantsEmail.includes("@gmail.com")
        );
        console.log("Filtered Participants List: ", filteredParticipantsList);
        setParticipantsList(filteredParticipantsList);
        setCount(filteredParticipantsList.length);
        const productDetailsPromises = filteredParticipantsList.map(
          (singleData) =>
            axios.get(
              `${process.env.REACT_APP_BASE_URL}/product/all/${singleData.participantsId}`
            )
        );

        Promise.all(productDetailsPromises)
          .then((results) => {
            // results will be an array containing the resolved responses
            console.log("Product responses: ", results);
            const productDetailsValues = results.map((res) => res.data);
            console.log("Product details values: ", productDetailsValues);
            setProductDetails(productDetailsValues);
          })
          .catch((error) => {
            console.error("Error fetching product details: ", error);
          });
      });
  }, []);

  const handleTabActive = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const fetchParticipantData = async () => {
      const participantDataPromises = participantsList
        .filter((participant) => participant.participantsEmail.includes("@"))
        .map(async (participant) => {
          const partcipantsDataResponse = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/user/${participant.participantsEmail}`
          );
          return {
            ...partcipantsDataResponse.data,
            participantsId: participant.participantsId,
          };
        });

      const participantData = await Promise.all(participantDataPromises);
      console.log("Participants data 1: ", participantData);
      setParticipantsData(participantData);
      setCount(participantData.length);
    };

    fetchParticipantData();
  }, [participantsList]);

  return (
    <Box
      sx={{
        padding: "15px 0",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: isSmallScreen ? "column" : "row",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ width: "272px" }}>
        <Box
          sx={{
            padding: "24px 16px",
            background: "#fff",
            border: "1px solid #e8ecf1",
            borderRadius: "10px",
            color: "#101a34",
            lineHeight: "25px",
          }}
        >
          <Box
            sx={{
              paddingBottom: "20px",
              marginBottom: "12px",
              borderBottom: "1px solid #e8ecf1",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              isactive={activeTab === 0}
              onClick={() => handleTabActive(0)}
            >
              <img
                src={Tick}
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "6px",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  opacity: 0.5,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                className={`tab ${activeTab === 0 ? "click" : ""}`}
              >
                Participating ({count})
              </Typography>
            </Box>
          </Box>
          <Typography>You are participating</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flexBasis: "calc(100% - 272px)",
          maxWidth: "calc(100% - 272px)",
          padding: "0 20px",
        }}
      >
        {activeTab === 0 && (
          <Tab0
            isSmallScreen={isSmallScreen}
            participantsData={participantsData}
            setFirstName={setFirstName}
            setParticipantsId={setParticipantsId}
            setSecondName={setSecondName}
            setIsViewWishesOpen={setIsViewWishesOpen}
            productDetails={productDetails}
          />
        )}
      </Box>
      {isViewWishesOpen && (
        <ViewWishes
          open={isViewWishesOpen}
          onClose={() => setIsViewWishesOpen(false)}
          participantsId={participantsId}
          setIsViewWishesOpen={setIsViewWishesOpen}
          firstName={firstName}
          secondName={secondName}
        />
      )}
    </Box>
  );
}

export default Participants;
