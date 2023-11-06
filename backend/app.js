const express = require("express");
const app = express();
// const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const participantsRoutes = require("./routes/participants");
const productsRoutes = require("./routes/products");
const messageRoutes = require("./routes/messages");

app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/player", participantsRoutes);
app.use("/product", productsRoutes);
app.use("/msg", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// app.use(errorMiddleware);

module.exports = app;
