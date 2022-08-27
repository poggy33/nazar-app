import React from "react";
import emailjs from "emailjs-com";
import "./sendEmail.css";

const SendEmail = (props) => {
  const listData = props.listData;
  const userName = props.username;

  const newListData = listData.map(function (item) {
    return [
      item.name,
      item.date,
      item.place,
      "start-" + item.start + ":00",
      "end-" + item.end + ":00",
      "amount-" + item.amount + " hour(s)",
    ].join("  ");
  });

  const newText = newListData.join("|____________|");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sq8d95g",
        "template_si4904o",
        e.target,
        "2lbmnCOrRQUHlUf_5"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            alert(userName + ", you sucsesfully sent email");
          }
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={sendEmail}>
        <div className="email_container">
          <div className="email_input">
            <label>Name:</label>
            <input
              type="text"
              name="user_name"
              readOnly
              value={userName}
            ></input>
          </div>
          <div className="email_input">
            <label>Email:</label>
            <input type="email" name="user_email" required />
          </div>
          <div className="email_submit">
            <input type="submit" value="Send email" />
          </div>
          <div className="email_input hidden">
            <label>Message:</label>
            <input name="message" readOnly value={newText}></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendEmail;
