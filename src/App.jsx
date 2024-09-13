import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Message from "./pages/Message";
import MailInboxProvider from "./contexts/MailnboxProvider";
import Profile from "./pages/Profile";

function App() {
  return (
    <MailInboxProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/message/:id" element={<Message />} />
          <Route path="/profile" e lement={<Profile />} />
        </Routes>
      </Router>
    </MailInboxProvider>
  );
}

export default App;
