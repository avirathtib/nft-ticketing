import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import axios from "../../axios/axios";
function IndiEvent() {
  const router = useRouter();
  // const {
  //   isReady,
  //   query: { id },
  // } = router;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    console.log(event);
  }, [event]);
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
  //#endregion
  const listEvent = (event) => (
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
      {console.log(event)}
      <div>{listEvent(event)}</div>
    </div>
  );
}

export default IndiEvent;
