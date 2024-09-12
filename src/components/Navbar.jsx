import React from "react";
import "./Navbar.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { listItems } = props;

  const onInboxHandler = () => {
    navigate("/inbox");
  };

  const onProfileHandler = () => {
    navigate("/profile");
  };

  const handleItemClick = (item) => {
    if (item.toLowerCase() === "inbox") {
      onInboxHandler();
    }
  };

  return (
    <div className="nav">
      <div className="logo">
        <span>
          <IoMdMail size={30} />
        </span>
        Mail
      </div>
      <ul>
        {listItems.map((el, i) => (
          <li key={i} onClick={() => handleItemClick(el)}>
            {el}{" "}
          </li>
        ))}
        <li>
          {" "}
          <FaRegUserCircle onClick={() => onProfileHandler()} size={30} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
