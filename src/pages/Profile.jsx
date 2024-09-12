import React, { useContext, useEffect, useState } from "react";
import { MailInboxContext } from "../contexts/MailnboxProvider";
import "./Profile.scss";

const Profile = () => {
  const { unreadCount, totalCount } = useContext(MailInboxContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Profile Overview</h2>
        <div className="profile-info">
          <div className="info-box">
            <span>{unreadCount}</span> <br /> Unread Messages
          </div>
          <div className="info-box">
            <span>{totalCount}</span> <br /> Total Messages
          </div>
          <div className="info-box">
            <span>{currentTime.toLocaleTimeString()}</span> <br /> Current Time
          </div>
          <div className="info-box">
            <span>{currentTime.toLocaleDateString()}</span> <br /> Current Date
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
