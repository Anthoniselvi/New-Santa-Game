import { Box, Typography } from "@mui/material";

function TabContent({
  afterEventDateCount,
  beforeEventDateCount,
  activeTab,
  setActiveTab,
}) {
  const handleTabActive = (index) => {
    setActiveTab(index);
  };
  return (
    <Box
      sx={{
        display: "flex",
        background: "#fafbfd",
        padding: "5px 20px 20px",
        borderBottom: "1px solid #cad3dd",
        marginBottom: 0,
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        gap: "10px",
      }}
    >
      <Typography
        isActive={activeTab === 0}
        className={`tab ${activeTab === 0 ? "active" : "notactive"}`}
        onClick={() => handleTabActive(0)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          color: "#101a34",
          fontSize: "17px",
        }}
        variant="body2"
      >
        Upcoming({afterEventDateCount})
      </Typography>
      <Typography
        isActive={activeTab === 1}
        className={`tab ${activeTab === 1 ? "active" : "notactive"}`}
        onClick={() => handleTabActive(1)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          color: "#101a34",
        }}
      >
        Past({beforeEventDateCount})
      </Typography>
    </Box>
  );
}

export default TabContent;
