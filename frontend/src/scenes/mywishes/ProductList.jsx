import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Gift from "./gift.png";

function ProductList({ productDetails, handleProductClick }) {
  const truncateText = (text, startIndex) => {
    const firstSlashIndex = text.indexOf("/");
    const secondSlashIndex = text.indexOf("/", firstSlashIndex + 1);
    const thirdSlashIndex = text.indexOf("/", secondSlashIndex + 1);
    const fourthSlashIndex = text.indexOf("/", thirdSlashIndex + 1);
    const productLink = text.substring(thirdSlashIndex + 1);
    const productFullName = productLink.split("?")[0].replace(/-/g, " ");

    const maxLength = fourthSlashIndex - thirdSlashIndex - 1;
    console.log("max length", maxLength);
    if (productFullName.length > maxLength) {
      const truncatedText = productFullName.substring(
        startIndex,
        startIndex + maxLength
      );
      return startIndex > 0 ? truncatedText + "..." : truncatedText + "...";
    }
    return productFullName;
  };

  const reversedProductDetails = [...productDetails].reverse();
  console.log("Reversed Product details: ", reversedProductDetails);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {reversedProductDetails.length === 0 ? (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            color: "#C21010",
            background: "#ffffff",
            height: "80vh",
            padding: "30px 20px",
            display: "flex",
            width: "100%",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          Add items to your wish list to help your gift giver find the perfect
          gift.
        </Typography>
      ) : (
        <Box
          sx={{
            background: "#ffffff",
            padding: "30px 20px",
            marginTop: "20px",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#c21010",
              fontSize: "22px",
              lineHeight: "26px",
              fontWeight: 600,
              margin: "0 0 20px",
            }}
          >
            My Wishes
            <span
              style={{
                opacity: 0.5,
              }}
            >
              ({reversedProductDetails.length})
            </span>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {reversedProductDetails.map((singleDetail, i) => (
              <Card
                sx={{
                  width: 220,
                  height: "230px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #e8ecf1",
                }}
                key={i}
              >
                <CardContent>
                  <Box
                    sx={{
                      height: "60%",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={Gift}
                      alt="Image Description"
                      sx={{
                        height: "125px",
                        width: "100px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "10px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      height: "40%",
                      width: "220px",
                      background: "#FFEAEA",
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px 15px",
                      "&:hover": {
                        backgroundColor: "#C21010",
                        color: "white",
                      },
                    }}
                  >
                    <Typography
                      onClick={() =>
                        handleProductClick(singleDetail.productUrl)
                      }
                      sx={{
                        "&: hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      {truncateText(singleDetail.productUrl, 0)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}{" "}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductList;
