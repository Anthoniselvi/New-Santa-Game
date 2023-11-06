import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import ProductList from "./ProductList";

function MyWishes({ eventId, userId, onProductAdded }) {
  const [productUrl, setProductUrl] = useState();
  const [participantsId, setParticipantsId] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

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

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/player/id/${userId}?eventId=${eventId}`
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

  const handleProductClick = (url) => {
    window.open(url, "_blank");
  };

  const handleAdd = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/product/add`, {
        productName: "",
        productUrl: productUrl,
        productPrice: "",
        description: "",
        eventId: eventId,
        participantsId: participantsId,
      })
      .then((response) => {
        console.log("Product Response: ", response.data);
        setProductUrl("");
        const newProductDetails = {
          productUrl: productUrl,
          eventId: eventId,
          participantsId: participantsId,
        };
        setProductDetails((previousProductDetails) => [
          ...previousProductDetails,
          newProductDetails,
        ]);
        onProductAdded();
      });
  };

  return (
    <Box
      sx={{
        padding: "15px 0",
        marginBottom: "20px",
        minHeight: "100vh",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "13px",
          lineHeight: "18px",
          color: "#101a34",
          marginBottom: "5px",
          wordBreak: "break-all",
        }}
      >
        Add an item
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 0,
        }}
      >
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="Enter a URL"
            sx={{
              maxWidth: "calc(100% - 130px)",
              flexBasis: "calc(100% - 130px)",
              background: "#fff",
              borderRadius: "10px",
              fontWeight: 400,
              fontSize: "16px",
              color: "#101a34",
              lineHeight: "27px",
              "& .MuiOutlinedInput-root": {
                height: "44px",
              },
            }}
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
        </ThemeProvider>
        <Button
          sx={{
            background: "#C21010",
            borderRadius: "7px",
            fontSize: "15px",
            lineHeight: "22px",
            color: "#fff",
            padding: "10px 20px",
            border: "2px solid #C21010",
            textTransform: "none",
            "&:hover": {
              background: "white",
              color: "#C21010",
            },
          }}
          onClick={handleAdd}
        >
          <AddCircleOutlineIcon /> Add
        </Button>
      </Box>
      <ProductList
        productDetails={productDetails}
        handleProductClick={handleProductClick}
      />
    </Box>
  );
}

export default MyWishes;
