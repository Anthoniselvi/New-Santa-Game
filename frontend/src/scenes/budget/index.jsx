import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Gift from "../mywishes/gift.png";
import Footer from "../../Components/Footer";
import { MyContext } from "../../Components/MyContext";
import Budget1 from "./budget1";
import BudgetForm from "./BudgetForm";

function Budget() {
  const [budget, setBudget] = useState();
  const [details, setdetails] = useState();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const userId = searchParam.get("userId");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = {};
    if (!budget) {
      validateErrors.budget = "Budget is required";
    }
    if (isNaN(parseFloat(budget)) || parseFloat(budget) <= 0) {
      validateErrors.budget = "Budget is required";
    }
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/event/${eventId}`, {
          budget: budget,
          details: details,
        })
        .then((response) => {
          console.log("update response: ", response);
          console.log("update data: ", response.data);
          navigate(`/success?userId=${userId}&eventId=${eventId}`);
        });
    }
  };

  return (
    <Box backgroundColor="#FFEAEA" width="100vw" p="50px 30px 33px 30px">
      <Budget1 userId={userId} />
      <Box
        sx={{
          minHeight: "80vh",
          background: "#fff",
          border: "1px solid #e8ecf1",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            maxWidth: "517px",
            margin: "0 auto",
            padding: "48px 10px 16px",
          }}
        >
          <Box
            sx={{
              paddingBottom: "28px",
              marginBottom: "28px",
              borderBottom: "1px solid #cad3dd",
              textAlign: "center",
            }}
          >
            <img
              src={Gift}
              alt="Gift image"
              height={100}
              width={100}
              className="starimage"
            />
            <Typography
              variant="h4"
              sx={{
                margin: "0 0 20px",
                color: "#C21010",
                fontWeight: 600,
                fontSize: isSmallScreen ? "20px" : "30px",
              }}
            >
              Gift exchange rules
            </Typography>
          </Box>
          <BudgetForm
            handleSubmit={handleSubmit}
            budget={budget}
            setdetails={setdetails}
            setBudget={setBudget}
            details={details}
            errors={errors}
            isSmallScreen={isSmallScreen}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Budget;
