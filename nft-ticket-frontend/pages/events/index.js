import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import Card from "react-bootstrap/Card";
import Link from "next/link";

function Events() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    console.log(allEvents);
  }, [allEvents]);

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const response = await axios.get("/");
    const newData = response.data;
    setAllEvents(newData);
  };

  const listItems = allEvents.map((event) => (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Link href={`/event/${event.eventId}`}>link to event main page</Link>
      </Card.Body>
    </Card>
  ));
  if (allEvents.length > 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {listItems}
      </div>
    );
  } else {
    return <div>bruh</div>;
  }
}

export default Events;
