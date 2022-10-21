import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import { ethers } from "ethers";
import axios from "../../axios/axios";
import { ConnectWallet, useAddress, useBalance } from "@thirdweb-dev/react";

import { WalletContext } from "../../_app";
function IndiEvent() {
  const address = useAddress();
  const provider = ethers.getDefaultProvider();
  const balance = useBalance();
  const router = useRouter();
  // const {
  //   isReady,
  //   query: { id },
  // } = router;
  const [event, setEvent] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const { wallet, setWallet } = useContext(WalletContext);
  useEffect(() => {
    setWallet(address);
    setTokenBalance(balance);
  }, [address]);
  useEffect(() => {
    if (!router.isReady) {
      console.log("Router not ready");
      return;
    } else {
      console.log(router.query);
      fetchEvent();

      console.log(`ID: ${router.query.id}`);
    }
  }, [router.isReady]);

  const fetchEvent = async () => {
    console.log("fetch", router.query);
    const response = await axios.get(`/${router.query.id}`);
    const newData = response.data;
    console.log(response);
    setEvent(newData);
  };

  const registerHandler = () => {
    if (!wallet) {
      alert("wallet not connected");
    } else if (event.availableSeats == 0) {
      alert("no seats available - event booked out");
    } else {
      // const balance = await provider.getBalance(wallet);
      // const intBalance = balance.toNumber();
      // console.log(intBalance / 1e18);
      console.log(balance.data.displayValue);
      if (balance.data.displayValue < event.price) {
        alert("Not enough funds to cover the transaction base cost");
      } else {
        console.log("Cool");
      }
    }
  };

  const listEvent = () => (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
      </Card.Body>
    </Card>
  );
  return (
    <div>
      {/* <div>{router.query}</div> */}
      <ConnectWallet accentColor="#f213a4" colorMode="dark" />
      <p>address is: {address}</p>
      <button onClick={registerHandler}>Register for Event</button>
      {event != null ? listEvent() : <></>}
    </div>
  );
}

export default IndiEvent;
