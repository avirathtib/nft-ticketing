import React, { useState } from "react";

function createEvent() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [link, setLink] = useState("");
  return <div></div>;
}

export default createEvent;
