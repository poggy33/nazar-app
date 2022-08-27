import React, { useState } from "react";
import axios from "axios";
import PartList from "../partList/PartList";
import SendEmail from "../sendEmail/SendEmail";
import "./list.css";

const List = (props) => {
  const userName = props.username;
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [listData, setListData] = useState(null);

  const listInfo = () => {
    if (userName) {
      axios({
        method: "POST",
        data: {
          username: userName,
          date: date,
        },
        withCredentials: true,
        url: "https://nazar-job.herokuapp.com/list",
      }).then((res) => {
        setListData(res.data);
      });
    }
  };

  return (
    <div className="list_container">
      <div className="search">
      {userName ? (
        <h3>Hello, {userName}</h3>
      ) : (
        <h3>Please login!!!</h3>
      )}
        
        <input
          placeholder="enter date"
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
        <button type="submit" onClick={listInfo}>
          search
        </button>
      </div>
      {listData ? (
        <div className="list">
          {listData.map((item) => {
            const date = item.date;
            const id = item._id;
            const place = item.place;
            const start = item.start + ":00";
            const end = item.end + ":00";
            const amount = item.amount;
            return (
              <PartList
                listInfo={listInfo}
                key={id}
                id={id}
                username={userName}
                date={date}
                start={start}
                end={end}
                place={place}
                amount={amount}
              />
            );
          })}
        </div>
      ) : null}

      {listData ? <SendEmail username={userName} listData={listData} /> : null}
    </div>
  );
};

export default List;
