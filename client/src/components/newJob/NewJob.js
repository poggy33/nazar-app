import React, { useState } from "react";
import "./newJob.css";
import axios from "axios";

const NewJob = (props) => {
  const userName = props.username;
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [place, setPlace] = useState(" ");
  const [start, setStart] = useState("6");
  const [end, setEnd] = useState("6");

  const handleSubmit = (event) => {
    event.preventDefault();
    const note = { userName, date, place, start, end };
    if (userName) {
      axios.post("https://nazar-job.herokuapp.com/new", note);
    }
    setPlace("");
    alert(userName + ", your job added!!!");
  };

  return (
    <div className="new">
      {userName ? (
        <h3>You can add new job {userName}</h3>
      ) : (
        <h3>Please login!!!</h3>
      )}
      <form className="new_form" onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
        <label>Place:</label>
        <input
          type="text"
          required
          value={place}
          onChange={(event) => setPlace(event.target.value)}
        ></input>
        <label>Start Hour:</label>
        <select
          size="5"
          value={start}
          onChange={(event) => setStart(event.target.value)}
        >
          <option value={6}>6:00</option>
          <option value={7}>7:00</option>
          <option value={8}>8:00</option>
          <option value={9}>9:00</option>
          <option value={10}>10:00</option>
          <option value={11}>11:00</option>
          <option value={12}>12:00</option>
          <option value={13}>13:00</option>
          <option value={14}>14:00</option>
          <option value={15}>15:00</option>
          <option value={16}>16:00</option>
          <option value={17}>17:00</option>
          <option value={18}>18:00</option>
          <option value={19}>19:00</option>
          <option value={20}>20:00</option>
          <option value={21}>21:00</option>
          <option value={22}>22:00</option>
        </select>
        <label>End Hour:</label>
        <select
          size="5"
          value={end}
          onChange={(event) => setEnd(event.target.value)}
        >
          <option value={6}>6:00</option>
          <option value={7}>7:00</option>
          <option value={8}>8:00</option>
          <option value={9}>9:00</option>
          <option value={10}>10:00</option>
          <option value={11}>11:00</option>
          <option value={12}>12:00</option>
          <option value={13}>13:00</option>
          <option value={14}>14:00</option>
          <option value={15}>15:00</option>
          <option value={16}>16:00</option>
          <option value={17}>17:00</option>
          <option value={18}>18:00</option>
          <option value={19}>19:00</option>
          <option value={20}>20:00</option>
          <option value={21}>21:00</option>
          <option value={22}>22:00</option>
        </select>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default NewJob;
