require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoose = require("mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");
var app = express();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🥰 mongodb connected 🥰 "))
  .catch(() =>
    console.log(
      "========== 😢 We are unable to connect to the mongo db 😢 =========="
    )
  );

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
