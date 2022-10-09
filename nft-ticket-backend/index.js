const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
var multer = require("multer");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
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

app.listen("0706", () => {
  console.log("Server listening on 0706");
});
