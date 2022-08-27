import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = (e) => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "https://nazar-job.herokuapp.com/login",
    }).then((res) => {
      if (res.data === "Successfully Authenticated") {
        alert(res.data);
      }
    });
  };

  return (
    <div className="login_container">
      <h3>Login</h3>
      <form className="login_form" onSubmit={login}>
        <input
          placeholder="FirstName_LastName"
          type="text"
          required
          value={loginUsername}
          onChange={(event) => setLoginUsername(event.target.value)}
        ></input>
        <input
          placeholder="Password"
          required
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
