import React from "react";
import axios from "axios";
import "./partList.css";

const PartList = (props) => {
  const id = props.id;
  const listInfo = props.listInfo;
  const deletePartList = () => {
    axios({
      method: "POST",
      data: {
        id: id,
      },
      withCredentials: true,
      url: "https://nazar-job.herokuapp.com/delete",
    }).then((res) => {
      //   console.log(res.data);
    });
    setTimeout(() => {
      listInfo();
    }, 300);
  };

  return (
    <div className="list_body">
      <div className="list_data">
        <p>name: {props.username}</p>
        <p>date: {props.date}</p>
        <p>place: {props.place} </p>
        <div className="list_hours">
          <p>start: {props.start} </p>
          <p>end: {props.end} </p>
        </div>
        <p>amount: {props.amount} </p>
      </div>
      <button onClick={deletePartList}>delete</button>
    </div>
  );
};

export default PartList;
