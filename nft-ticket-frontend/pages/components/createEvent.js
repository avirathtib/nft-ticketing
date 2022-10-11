import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { useFileUpload } from "use-file-upload";
import "react-datepicker/dist/react-datepicker.css";
import { useSigner } from "@thirdweb-dev/react";
import { ChainId, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { WalletContext } from "../_app";
import { v4 as uuid } from "uuid";
import axios from "../axios/axios";
function createEvent() {
  const signer = useSigner();
  const sdk = ThirdwebSDK.fromSigner(signer, "goerli");
  const { wallet, setWallet } = useContext(WalletContext);
  const [event, setEvent] = useState({
    id: 0,
    title: "",
    date: "",
    image: "",
    video: "",
    price: 0,
    description: "",
    host: "",
    totalSeats: 0,
    availableSeats: 0,
    link: "",
  });
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [image, setImage] = useState("");
  const [nftImage, setNftImage] = useState(null);
  const [video, setVideo] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [link, setLink] = useState("");
  const [date, setDate] = useState(new Date());
  const selectDateHandler = (d) => {
    console.log("hi" + d);
    setDate(d);
    setFinalDate(d.toString());
  };

  const submitHandler = (e) => {
    // e.preventDefault();
    axios
      .post("/", {
        eventId: uuid(),
        title: title,
        date: finalDate,
        price: price,
        description: description,
        host: host,
        totalSeats: totalSeats,
        link: link,
        nftImage: nftImage,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  const fileChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setNftImage(e.target.files[0]);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <label>
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </label>
        <label>
          Date:
          <DatePicker
            dateFormat="yyyy/MM/dd"
            onChange={selectDateHandler}
            todayButton={"Today"}
          />
        </label>
        <label>Image:</label>
        <input type="file" onChange={fileChangeHandler}></input>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Host Address
          <input
            type="text"
            value={host}
            onChange={(e) => {
              setHost(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Tickets Quantity:
          <input
            type="number"
            value={totalSeats}
            onChange={(e) => {
              setTotalSeats(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Link:
          <input
            type="link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default createEvent;
