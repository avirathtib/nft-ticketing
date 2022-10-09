const router = require("express").Router();
const Event = require("../models/Event");
const multer = require("multer");
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single("nftImage"), async (req, res) => {
  const event = new Event({
    eventId: req.body.eventId,
    title: req.body.title,
    date: req.body.date,
    price: req.body.price,
    description: req.body.description,
    hostAddress: req.body.host,
    totalSeats: req.body.totalSeats,
    availableSeats: req.body.totalSeats,
    link: req.body.link,
    nftImage: req.file.file,
  });
  try {
    const newData = await event.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
