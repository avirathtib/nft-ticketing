const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createEventRoute = require("./routes/Event");
const app = express();

app.use(express.json());
app.use(cors());
// app.set("view engine", "ejs");
//  `mongodb+srv://avirathandsurabhi:avirathandsurabhi@nft-ticketing.l9hzbjb.mongodb.net/?retryWrites=true&w=majority`

mongoose
  .connect(
    `mongodb+srv://avirathandsurabhi:avirathandsurabhi@nft-ticketing.l9hzbjb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("", createEventRoute);
app.listen("1612", () => {
  console.log("Server listening on 1612");
});
