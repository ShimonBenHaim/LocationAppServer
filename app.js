const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const notificationRoutes = require("./routes/notification");

const app = express();
mongoose.connect("mongodb+srv://shimon:" +
 process.env.MONGO_ATLAS_PW +
  "@cluster0-hzdkz.mongodb.net/node-angular")
.then(() => {
    console.log("Connected to database!")
})
.catch(() => {
    console.log(" db Connection failed!")
});
    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user" , userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/notification", notificationRoutes);

module.exports = app;
