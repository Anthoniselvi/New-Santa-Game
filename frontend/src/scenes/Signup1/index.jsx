import React, { useContext, useState } from "react";
import { Box, createTheme } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { MyContext } from "../../Components/MyContext";
import Signup1Form from "./Signup1Form";

function Signup1() {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [birthDay, setBirthDay] = useState();
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn } = useContext(MyContext);

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "grey",
              },
            },
          },
        },
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!firstName) {
      validationErrors.firstName = "First Name is required";
    }
    if (!birthDay) {
      validationErrors.birthDay = "BirthDay is required";
    }

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/user/${userId}`, {
          firstName: firstName,
          secondName: secondName,
          birthDay: birthDay,
        })
        .then((response) => {
          console.log("update response: ", response);
          console.log("update response data: ", response.data);
          navigate(`/home?userId=${userId}`);
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#CFE8A9",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Signup1Form
          theme={theme}
          firstName={firstName}
          secondName={secondName}
          setFirstName={setFirstName}
          setSecondName={setSecondName}
          birthDay={birthDay}
          setBirthDay={setBirthDay}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </Box>
    </Box>
  );
}

export default Signup1;
