import React, { useContext } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { FaChevronLeft } from "react-icons/fa";
import { MyContext } from "./MyContext";
import MenuIcon from "@mui/icons-material/Menu";

const MobileMenu = ({ handleDrawerClose }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "50px",
      marginBottom: "1rem",
      position: "fixed",
      zIndex: 5000,
      color: "#C21010",
      background: "white",
      width: "100vw",
      height: "50px",
    }}
  >
    <MenuIcon
      sx={{
        color: "#C21010",
        fontSize: "1.5rem",
        cursor: "pointer",
        marginLeft: "15px",
      }}
      onClick={handleDrawerClose}
    />
    <Typography variant="h4" fontWeight="bold" color="#C21010" fontSize="20px">
      Santa Surprise
    </Typography>
  </Box>
);

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn } = useContext(MyContext);
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");

  console.log("is Logged in: ", isLoggedIn);

  const handleDrawerClose = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    {
      text: "Home",
      icon: <CardGiftcardOutlinedIcon />,
      link: isLoggedIn ? `home?userId=${userId}` : "/login",
    },
    {
      text: "My Gifts",
      icon: <EditCalendarOutlinedIcon />,
      link: isLoggedIn ? `mygifts?userId=${userId}` : "/login",
    },
  ];

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <>
      <Box component="nav">
        {!isNonMobile && isSidebarOpen ? (
          <MobileMenu handleDrawerClose={handleDrawerClose} />
        ) : null}
        <Drawer
          open={isNonMobile ? isSidebarOpen : !isSidebarOpen}
          onClose={handleDrawerClose}
          variant={isNonMobile ? "permanent" : "temporary"}
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <div
            style={{
              height: "100%",
              overflowY: "hidden",
              position: "relative",
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 1rem 2rem 1rem">
                <FlexBetween>
                  <Box display="flex" alignItems="center" gap="0.3rem">
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="#C21010"
                      fontSize={isNonMobile ? "27px" : "20px"}
                    >
                      Santa Surprise
                    </Typography>
                  </Box>
                  {!isNonMobile && (
                    <IconButton onClick={handleDrawerClose}>
                      <FaChevronLeft />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <List>
                {navItems.map((item) => (
                  <ListItemButton
                    key={item.text}
                    onClick={() => {
                      navigate(item.link);
                    }}
                    sx={{
                      backgroundColor:
                        active === item.text.toLowerCase() && item.icon
                          ? "#FFEAEA"
                          : "transparent",
                      color:
                        active === item.text.toLowerCase() && item.icon
                          ? "#C21010"
                          : "black",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          active === item.text.toLowerCase() && item.icon
                            ? "#C21010"
                            : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        fontWeight: "bold",
                      }}
                    />
                  </ListItemButton>
                ))}
                {!isLoggedIn ? (
                  <>
                    <ListItemButton
                      key="login"
                      onClick={() => {
                        navigate("/login");
                      }}
                      sx={{
                        backgroundColor: "transparent",
                        color: "#C21010",
                        padding: "5px 5px",
                        border: "2px solid #C21010",
                        margin: "0px 25px",
                        borderRadius: "10px",
                        "&: hover": {
                          background: "#C21010",
                          color: "#FFF",
                        },
                      }}
                    >
                      <ListItemText
                        primary="Login"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      />
                    </ListItemButton>
                    <ListItemButton
                      key="signup"
                      onClick={() => {
                        navigate("/signup");
                      }}
                      sx={{
                        backgroundColor: "#C21010",
                        color: "#FFF",
                        padding: "5px 5px",
                        border: "2px solid #C21010",
                        margin: "10px 25px",
                        borderRadius: "10px",
                        "&: hover": {
                          background: "#FFF",
                          color: "#C21010",
                        },
                      }}
                    >
                      <ListItemText
                        primary="Sign Up"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      />
                    </ListItemButton>
                  </>
                ) : (
                  <ListItemButton
                    key="logout"
                    onClick={() => {
                      setIsLoggedIn(false);
                      navigate("/");
                    }}
                    sx={{
                      backgroundColor:
                        active === "logout" ? "#FFEAEA" : "transparent",
                      color: active === "logout" ? "#E64848" : "black",
                    }}
                  >
                    <ListItemIcon>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                )}
              </List>
            </Box>
          </div>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
