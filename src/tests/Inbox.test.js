import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Inbox from "../pages/Inbox";
import { MailInboxContext } from "../contexts/MailnboxProvider";

const mockContextValue = {
  messages: [
    { id: 1, subject: "Test Message 1", isArchived: false, isTrash: false },
    { id: 2, subject: "Test Message 2", isArchived: false, isTrash: false },
  ],
  setMessages: jest.fn(),
  theme: "light",
};

describe("Inbox Component", () => {
  beforeEach(() => {
    render(
      <MailInboxContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Inbox />
        </MemoryRouter>
      </MailInboxContext.Provider>
    );
  });

  test("renders ThemeToggleButton component", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders sidebar items", () => {
    const sidebarItems = ["Inbox", "Starred", "Archived", "Trash"];
    sidebarItems.forEach((item) => {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    });
  });

  test("renders InboxSection component with correct title", () => {
    expect(screen.getAllByText("Inbox").length).toBeGreaterThan(0);
  });

  test("changes section on sidebar item click", () => {
    fireEvent.click(screen.getByText("Starred"));
    expect(screen.getAllByText("Starred").length).toBeGreaterThan(0);
  });
});
