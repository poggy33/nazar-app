import "./app.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import List from "./components/list/List";
import NewJob from "./components/newJob/NewJob";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import axios from "axios";
import SendEmail from "./components/sendEmail/SendEmail";

const App = () => {
  const [userName, setUserName] = useState(null);

  async function getUserName() {
    await axios({
      method: "GET",
      withCredentials: true,
      url: "https://nazar-job.herokuapp.com/user",
    }).then((res) => {
      setUserName(res.data.username);
    });
  };
  getUserName();

  return (
    <div className="app">
      <Navbar />
   
      <Routes>
        <Route path="/" element={<List username={userName}/>} />
        <Route path="/new" element={<NewJob username={userName}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email" element={<SendEmail />} />
      </Routes>
    </div>
  );
};

export default App;
