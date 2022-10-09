import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { useFileUpload } from "use-file-upload";
import "react-datepicker/dist/react-datepicker.css";
import { useSigner } from "@thirdweb-dev/react";
import { ChainId, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { WalletContext } from "../_app";
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
  const [file, setFile] = useState();
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

  const submitHandler = () => {
    console.log("surabhi is a maniac");
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault;
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
        <input type="file" value={file} onClick={fileChangeHandler}></input>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.price)}
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
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </>
  );
}

export default createEvent;
