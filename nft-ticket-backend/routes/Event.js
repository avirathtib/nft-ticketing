const router = require("express").Router();
const Event = require("../models/Event");

router.post("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  Event.findOne({ eventId: req.params.id }, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log(data);
      console.log(req.params);
      res.status(200).send(data);
    }
  });
});

router.get("/", async (req, res) => {
  Event.find((err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
