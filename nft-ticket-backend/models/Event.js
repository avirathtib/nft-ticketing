const mongoose = require("mongoose");
const validator = require("validator");

const eventSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEthereumAddress(value)) {
        throw new Error("Address is invalid");
      }
    },
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  nftImage: {
    type: String,
    required: true,
  },
});
