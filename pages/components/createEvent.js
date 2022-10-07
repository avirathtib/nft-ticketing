import React, { useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const selectDateHandler = (d) => {
    setDate(d);
  };
  return (
    <>
      <form>
        <input
          type="text"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: event.title })}
        ></input>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          onChange={selectDateHandler}
          todayButton={"Today"}
        />

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
