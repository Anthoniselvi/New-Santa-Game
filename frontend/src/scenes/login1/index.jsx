import React, { useState, useContext } from "react";
import { Box, createTheme, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import { MyContext } from "../../Components/MyContext";
import LoginForm from "../login/LoginForm";

function Login1() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const participantsId = searchParam.get("participantsId");
  const { setIsLoggedIn } = useContext(MyContext);
  const themes = useTheme();
  const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!loginData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!loginData.password) {
      validationErrors.password = "Password is required";
    } else if (loginData.password.length < 5) {
      validationErrors.password = "Password must be more than 5 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      ).then(async (res) => {
        console.log(res);
        setIsLoggedIn(true);
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/player/${participantsId}`, {
            participantsEmail: loginData.email,
            userId: res.user.uid,
          })
          .then((response) => {
            console.log("participants update response: ", response.data);
            navigate(`/eventview?eventId=${eventId}&userId=${res.user.uid}`);
            setIsLoggedIn(true);
          });
      });
      console.log("button clicked");
    }
  };

  const handleSignup = () => {
    navigate(`/signup2?participantsId=${participantsId}`);
  };

  const handleClickPassword = () => {
    navigate("/reset");
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#FFEAEA",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: isSmallScreen ? "100%" : "100vw",
          padding: isSmallScreen ? "20px" : "1.5rem 2.5rem",
        }}
      >
        <LoginForm
          isSmallScreen={isSmallScreen}
          handleLogin={handleLogin}
          theme={theme}
          loginData={loginData}
          handleChange={handleChange}
          errors={errors}
          handleClickPassword={handleClickPassword}
          handleSignup={handleSignup}
        />
      </Box>
    </Box>
  );
}

export default Login1;
