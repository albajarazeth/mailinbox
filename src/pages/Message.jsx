import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MailInboxContext } from "../contexts/MailnboxProvider";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const { messages, theme } = useContext(MailInboxContext);
  const navigate = useNavigate();

  const message = messages.find((msg) => msg.id === parseInt(id));

  if (!message) {
    return <div>Message not found</div>;
  }

  const goBackHandler = () => {
    navigate(-1);
  };

  const onHomeHandler = () => {
    navigate("/");
  };

  return (
    <div className="msg-container">
      <div className="arrow">
        <div onClick={goBackHandler} className="left-arrow">
          <FaArrowLeft size={40} />
        </div>
        <div onClick={onHomeHandler} className="home">
          <IoMdHome size={40} />
        </div>
      </div>
      <div className={`msg-content ${theme !== "light" ? "dark" : ""}`}>
        <div className="msg">
          <h2>{message.subject}</h2>
          <div className="line"></div>
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
