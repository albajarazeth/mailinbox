import React, { createContext, useState, useEffect } from "react";
import messagesData from "../messagesData.json";

export const MailInboxContext = createContext();

const MailInboxProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const unreadCount = messages.filter((message) => !message.isRead).length;

  const totalCount = messages.length;

  useEffect(() => {
    setMessages(messagesData);
  }, []);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <MailInboxContext.Provider
      value={{
        messages,
        setMessages,
        unreadCount,
        totalCount,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </MailInboxContext.Provider>
  );
};

export default MailInboxProvider;
