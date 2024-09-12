import React from "react";
import "./Navbar.scss";
import { IoMdHome } from "react-icons/io";

import { FaRegUserCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { listItems, isHome, isProfile } = props;

  const goBackHandler = () => {
    navigate(-1);
  };

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
          {isHome ? (
            <>
              <IoMdMail size={30} /> <span className="text">Mail</span>
            </>
          ) : (
            <div className="arrow" onClick={goBackHandler}>
              <FaArrowLeft size={40} />
            </div>
          )}
        </span>
      </div>
      <ul>
        {listItems.map((el, i) => (
          <li key={i} onClick={() => handleItemClick(el)}>
            {el}{" "}
          </li>
        ))}
        <li>
          {!isProfile && (
            <FaRegUserCircle onClick={() => onProfileHandler()} size={30} />
          )}
          {isProfile && <IoMdHome size={40} />}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
