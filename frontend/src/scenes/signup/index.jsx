import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, createTheme, useTheme, useMediaQuery } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../Components/Navbar";
import SignupPage from "./SignupPage";

function Signup() {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const themes = useTheme();
  const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));

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

  const updateHandleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setDataIsCorrect(true);
    console.log("button clicked");
    const validationErrors = {};
    if (!signupData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!signupData.password) {
      validationErrors.password = "Password is required";
    } else if (signupData.password.length < 5) {
      validationErrors.password = "Password must be more than 5 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      ).then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: signupData.name,
        });
        // create profile here
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: signupData.email,
          password: signupData.password,
        });
        console.log("Register with firebase");

        //Make the POST request to your API end point
        fetch(`${process.env.REACT_APP_BASE_URL}/user/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            email: signupData.email,
            password: signupData.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data: ", data);
            console.log("fetch id: ", data.userId);
            navigate(`/signup1?userId=${user.uid}`);
          })
          .catch((error) => {
            console.log(error);
            setErrors(error.message);
          });
      });
    }
  };

  const handleClick = () => {
    console.log("Login Button Clicked");
    navigate("/login");
  };

  return (
    <Box>
      <Navbar />
      <SignupPage
        theme={theme}
        handleSubmit={handleSubmit}
        isSmallScreen={isSmallScreen}
        signupData={signupData}
        updateHandleChange={updateHandleChange}
        errors={errors}
        handleClick={handleClick}
      />
    </Box>
  );
}

export default Signup;
