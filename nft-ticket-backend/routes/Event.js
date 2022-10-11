const router = require("express").Router();
const Event = require("../models/Event");
const multer = require("multer");
const { fstat } = require("fs");
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    dirname = "./uploads/";
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
    cb(null, dirname);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
var upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single("nftImage"), async (req, res) => {
  console.log(req.body);
  // console.log(JSON.parse(req.body));
  const event = new Event({
    eventId: req.body.eventId,
    title: req.body.title,
    date: req.body.date,
    price: req.body.price,
    description: req.body.description,
    host: req.body.host,
    totalSeats: req.body.totalSeats,
    availableSeats: req.body.totalSeats,
    link: req.body.link,
    image: req.body.image,
  });
  try {
    console.log(event);
    const newData = await event.save();
    res.status(201).json(newData);
  } catch (err) {
    console.log(event);

    console.log(req.body);

    res.status(500).json(err);
  }
});

module.exports = router;
