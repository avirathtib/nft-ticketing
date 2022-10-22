import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import { ethers } from "ethers";
import axios from "../../axios/axios";
import {
  ConnectWallet,
  useAddress,
  useBalance,
  useContract,
} from "@thirdweb-dev/react";

import { WalletContext } from "../../_app";

export async function getServerSideProps({ params }) {
  const id = params.id;
  console.log(params);
  const response = await axios.get(`/${id}`);
  const newData = response.data;
  console.log(newData);
  return {
    props: newData,
  };
}

function IndiEvent(props) {
  const address = useAddress();
  const balance = useBalance();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const { wallet, setWallet } = useContext(WalletContext);
  const { contract } = useContract(props.host);
  useEffect(() => {
    console.log(props.eventId);
    setWallet(address);
    setTokenBalance(balance);
  }, [address]);
  // useEffect(() => {
  //   if (!router.isReady) {
  //     console.log("Router not ready");
  //     return;
  //   } else {
  //     console.log(router.query);
  //     fetchEvent();

  //     console.log(`ID: ${router.query.id}`);
  //   }
  // }, [router.isReady]);

  // const fetchEvent = async () => {
  //   console.log("fetch", router.query);
  //   const response = await axios.get(`/${router.query.id}`);
  //   const newData = response.data;
  //   console.log(response);
  //   setEvent(newData);
  // };

  const registerHandler = () => {
    if (!wallet) {
      alert("wallet not connected");
    } else if (props.availableSeats == 0) {
      alert("no seats available - event booked out");
    } else {
      console.log(balance.data.displayValue);
      if (balance.data.displayValue < props.price) {
        alert("Not enough funds to cover the transaction base cost");
      } else {
        console.log(contract);
      }
    }
  };

  const listEvent = () => (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
  return (
    <div>
      {/* <div>{router.query}</div> */}
      <ConnectWallet accentColor="#f213a4" colorMode="dark" />
      <p>address is: {address}</p>
      <button onClick={registerHandler}>Register for Event</button>
      {listEvent()}
    </div>
  );
}

export default IndiEvent;
