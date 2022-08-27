import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css"

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "https://nazar-job.herokuapp.com/register",
    }).then((res) => {
      console.log(res.data);
      alert(res.data);
      if (res.data === "User Already Exists") {
        navigate("/login");
      }
      if (res.data === "User Created") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="register_container">
      <h3>Register</h3>
      <div className="register">
        <input
          placeholder="FirstName_LastName"
          type="text"
          required
          value={registerUsername}
          onChange={(event) => setRegisterUsername(event.target.value)}
        ></input>
        <input
          placeholder="Password"
          required
          value={registerPassword}
          onChange={(event) => setRegisterPassword(event.target.value)}
        ></input>
        <button type="submit" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
