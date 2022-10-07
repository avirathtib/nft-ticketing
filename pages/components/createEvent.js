import React, { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";

function createEvent() {
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
  const [date, setDate] = useState(new Date());
  return (
    <>
      <form>
        <input
          type="text"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: event.title })}
        ></input>
        <DatePicker
          onChange={(data) => {
            setDate(data);
            // setEvent({ ...event, date: event.data.toString() });
          }}
          selected={date}
        ></DatePicker>
        <input></input>
        <input></input>
        <input></input>
        <input></input>
        <input></input>
        <input></input>
        <input></input>
        <input></input>
      </form>
    </>
  );
}

export default createEvent;
