const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createEventRoute = require("./routes/Event");
const app = express();

app.use(express.json());
app.use(cors());
// app.set("view engine", "ejs");

const client = new MongoClient(
  `mongodb+srv://avirathandsurabhi:avirathandsurabhi@nft-ticketing.l9hzbjb.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

let db = "";

client.connect((err, res) => {
  if (err) {
    throw err;
  }
  console.log("database connected");
  db = res.db("ticketing");
});

app.use("", createEventRoute);
app.listen("0706", () => {
  console.log("Server listening on 0706");
});
