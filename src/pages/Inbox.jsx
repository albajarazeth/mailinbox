import React, { useContext, useState } from "react";
import "./Inbox.scss";
import Navbar from "../components/Navbar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { MdInbox } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import { MailInboxContext } from "../contexts/MailnboxProvider";
import InboxSection from "../components/InboxSection";

const Inbox = (props) => {
  const [currentLabel, setCurrentLabel] = useState("Inbox");

  const { messages, setMessages, theme } = useContext(MailInboxContext);

  const listItems = [<ThemeToggleButton />];

  const sidebarItems = [
    { icon: <MdInbox />, label: "Inbox" },
    { icon: <FaRegStar />, label: "Starred" },
    { icon: <FaArchive />, label: "Archived" },
    { icon: <FaRegTrashAlt />, label: "Trash" },
  ];

  let currentSection;

  switch (currentLabel) {
    case "Inbox":
      currentSection = (
        <InboxSection title="Inbox" setMessages={setMessages} icons={[]} />
      );
      break;
    case "Starred":
      currentSection = (
        <InboxSection
          title="Starred"
          icon={<FaRegStar fontSize={25} />}
          setMessages={setMessages}
        />
      );
      break;
    case "Archived":
      currentSection = (
        <InboxSection title="Archived" setMessages={setMessages} />
      );
      break;
    case "Trash":
      currentSection = <InboxSection title="Trash" setMessages={setMessages} />;
      break;
    default:
      currentSection = (
        <InboxSection
          title="Inbox"
          messages={messages.filter((msg) => !msg.isArchived && !msg.isTrash)}
          setMessages={setMessages}
        />
      );
      break;
  }

  return (
    <div className="inbox-container">
      <Navbar listItems={listItems} />
      <div className="inbox-content">
        <div className={`sidebar ${theme === "light" ? "" : "sidebar-dark"}`}>
          <ul>
            {sidebarItems.map((item, index) => (
              <li
                onClick={() => setCurrentLabel(item.label)}
                className={`${currentLabel === item.label ? "active" : ""}`}
                key={index}
              >
                {item.icon}
                <div>{item.label}</div>
              </li>
            ))}
          </ul>
          {/* <div className="tag-container">
            <div>Tags</div>
            <div className="plus">
              <FaPlus />
            </div>
          </div> */}
        </div>
        <div className="section-content">
          <div className="section">{currentSection}</div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
