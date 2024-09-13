import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import { MailInboxContext } from "../contexts/MailnboxProvider";

const mockContextValue = {
  theme: "light",
  unreadCount: 5,
  totalCount: 20,
};

describe("Home Component", () => {
  beforeEach(() => {
    render(
      <MailInboxContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </MailInboxContext.Provider>
    );
  });

  test("renders welcome message", () => {
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
  });

  test("displays unread messages count", () => {
    expect(
      screen.getByText(
        `You have ${mockContextValue.unreadCount} unread messages`
      )
    ).toBeInTheDocument();
  });
});
