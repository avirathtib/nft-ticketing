import React, { useEffect, useState, useContext } from "react";
import FileBase64 from "react-file-base64";
import DatePicker from "react-datepicker";
import { useFileUpload } from "use-file-upload";
import "react-datepicker/dist/react-datepicker.css";
import { useSigner } from "@thirdweb-dev/react";
import { ChainId, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Web3Button } from "@thirdweb-dev/react";
import { ContractContext } from "../_app";
import { WalletContext } from "../_app";
import { v4 as uuid } from "uuid";
import Link from "next/link";

import axios from "../axios/axios";
function createEvent() {
  const signer = useSigner();
  const sdk = ThirdwebSDK.fromSigner(signer, "goerli");
  const { wallet, setWallet } = useContext(WalletContext);
  const { nftContract, setNftContract } = useContext(ContractContext);
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
  const [files, setFiles] = useState([]);
  const [video, setVideo] = useState("");
  const [tempContractAddress, setTempContractAddress] = useState("");
  const [mintPossible, setMintPossible] = useState(false);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [link, setLink] = useState("");
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    console.log("contract", nftContract);
  }, [nftContract]);
  const selectDateHandler = (d) => {
    setDate(d);
    setFinalDate(d.toString());
  };

  // e.preventDefault();
  const submitHandler = async (e) => {
    // e.preventDefault();
    axios.post("/", {
      eventId: uuid(),
      title: title,
      date: finalDate,
      price: price,
      description: description,
      host: host,
      totalSeats: totalSeats,
      link: link,
      image: image,
    });
    e.preventDefault();
    const contractAddress = await sdk.deployer.deployNFTDrop({
      name: "My Drop",
      primary_sale_recipient: host,
    });
    setTempContractAddress(contractAddress);
    setMintPossible(true);
    console.log("Contract address", contractAddress);
    console.log(mintPossible);
    setNftContract(contractAddress);
    // console.log("address", contract);
    // const metadatas = [
    //   {
    //     name: `Ticket for ${title}`,
    //     description: description,
    //     // image: fs.readFileSync("/Users/avirathtibrewala/Desktop/nba.png"),
    //   },
    // ];
    // const { contract } = useContract(tempContractAddress, "nft-drop");
    // const results = await contract.createBatch(metadatas);
    // const firstNFT = await results[0].data();
    // console.log(firstNFT);
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

        <FileBase64
          multiple={false}
          onDone={({ base64 }) => {
            setImage(base64);
            console.log(image);
          }}
        />
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
      <p>{tempContractAddress}</p>
      {nftContract != "" ? (
        <div>
          <Web3Button
            contractAddress={nftContract}
            action={(contract) => {
              console.log(contract);
            }}
          >
            Mint NFT
          </Web3Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default createEvent;