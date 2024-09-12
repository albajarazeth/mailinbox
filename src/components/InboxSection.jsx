import React, { useContext, useState } from "react";
import "./InboxSection.scss";
import {
  FaArchive,
  FaStar,
  FaRegStar,
  FaRegTrashAlt,
  FaTrash,
} from "react-icons/fa";
import { CiUnread } from "react-icons/ci";
import { CiRead } from "react-icons/ci";

import { MailInboxContext } from "../contexts/MailnboxProvider";
import { useNavigate } from "react-router-dom";

const InboxSection = (props) => {
  const { title } = props;

  const { messages, setMessages } = useContext(MailInboxContext);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onStarredHandler = (id) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        return { ...message, isStarred: !message.isStarred };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const onTrashHandler = (id) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        return { ...message, isTrash: !message.isTrash };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const onArchivedHandler = (id) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        return { ...message, isArchived: !message.isArchived };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const onReadHandler = (id) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id && !message.isRead) {
        return { ...message, isRead: true };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const onUnreadHandler = (id) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id && message.isRead) {
        return { ...message, isRead: false };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const starredIcons = (el) => {
    return el.isStarred ? (
      <FaStar fontSize={25} color="gold" />
    ) : (
      <FaRegStar fontSize={25} />
    );
  };

  const trashIcons = (el) => {
    return el.isTrash ? (
      <FaTrash fontSize={20} color="red" />
    ) : (
      <FaRegTrashAlt fontSize={20} />
    );
  };

  const archivedIcons = (el) => {
    return el.isArchived ? (
      <FaArchive fontSize={20} color="blue" />
    ) : (
      <FaArchive fontSize={20} />
    );
  };

  const readIcons = (el) => {
    return el.isRead ? (
      <CiRead fontSize={20} color="blue" />
    ) : (
      <CiUnread fontSize={20} />
    );
  };

  const MessageActions = (el) => {
    return (
      <div className="actions-list">
        <div
          className="action-icon"
          onClick={(e) => {
            e.stopPropagation();
            onArchivedHandler(el.id);
          }}
        >
          {archivedIcons(el)}
        </div>
        <div
          className="action-icon"
          onClick={(e) => {
            e.stopPropagation();
            onTrashHandler(el.id);
          }}
        >
          {trashIcons(el)}
        </div>
        <div
          className="action-icon"
          onClick={(e) => {
            e.stopPropagation();
            el.isRead ? onUnreadHandler(el.id) : onReadHandler(el.id);
          }}
        >
          {readIcons(el)}
        </div>
      </div>
    );
  };

  const filteredMessages = () => {
    let filtered = messages;
    switch (title) {
      case "Inbox":
        filtered = messages.filter((msg) => !msg.isArchived && !msg.isTrash);
        break;
      case "Starred":
        filtered = messages.filter((msg) => msg.isStarred && !msg.isTrash);
        break;
      case "Archived":
        filtered = messages.filter((msg) => msg.isArchived && !msg.isTrash);
        break;
      case "Trash":
        filtered = messages.filter((msg) => msg.isTrash);
        break;
      default:
        filtered = messages;
        break;
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (msg) =>
          msg.subject.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          msg.content.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const showStarred = title !== "Archived" && title !== "Trash";

  const onClickHandler = (el) => {
    onReadHandler(el.id);
    navigate(`/message/${el.id}`);
  };
  return (
    <div className="inbox-container">
      <span className="title">{title}</span>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="inbox-list">
        <div className="message-container">
          {filteredMessages().map((el, i) => {
            return (
              <div
                onClick={() => onClickHandler(el)}
                className="message"
                key={i}
              >
                {showStarred && (
                  <div
                    className="single-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStarredHandler(el.id);
                    }}
                  >
                    {starredIcons(el)}
                  </div>
                )}
                <div className="content">
                  <div className={` ${el.isRead ? "" : "subject"} `}>
                    {el.subject}
                  </div>
                  <div>{el.content}</div>
                </div>
                <div className="icons-list">{MessageActions(el)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InboxSection;
