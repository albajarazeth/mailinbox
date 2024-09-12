import React, { useContext } from "react";
import "./Home.scss";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { MailInboxContext } from "../contexts/MailnboxProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const { theme, unreadCount, totalCount } = useContext(MailInboxContext);
  const navigate = useNavigate();
  const isHome = true;

  const handleViewMessages = () => {
    navigate("/inbox");
  };

  const listItems = [<ThemeToggleButton />, "Inbox"];

  return (
    <div className="home-container">
      <Navbar isHome={isHome} listItems={listItems} />
      <div className="home-content">
        <div className="home-hero">
          <div>
            <h1>Welcome Back!</h1>
            <p>You have {unreadCount} unread messages</p>
            <button className="view-button" onClick={handleViewMessages}>
              View Messages
            </button>
          </div>
        </div>
        <div className="info">
          <div className={`box ${theme}`}>
            <span>{unreadCount}</span> <br /> Unread Messages
          </div>
          <div className={`box ${theme}`}>
            <span> {totalCount}</span> <br />
            Total Messages
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
