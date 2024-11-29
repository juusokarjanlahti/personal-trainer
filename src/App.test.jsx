import React from "react";
import { HashRouter as Router } from "react-router";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { test, expect } from "vitest";
import App from "./App";

test("renders App component with navigation links", () => {
  // Use render() to render the App component for testing
  render(
    <Router>
      <App />
    </Router>
  );

  // Check for the Welcome link
  const welcomeLink = screen.getByText(/Welcome/i);
  expect(welcomeLink).toBeInTheDocument();

  // Check for the Customers link
  const customersLink = screen.getByText(/Customers/i);
  expect(customersLink).toBeInTheDocument();

  // Check for the Training Sessions link
  const trainingSessionsLink = screen.getByText(/Training Sessions/i);
  expect(trainingSessionsLink).toBeInTheDocument();

  // Check for the Training Calendar link
  const trainingCalendarLink = screen.getByText(/Training Calendar/i);
  expect(trainingCalendarLink).toBeInTheDocument();

  // Check for the Statistics link
  const statisticsLink = screen.getByText(/Statistics/i);
  expect(statisticsLink).toBeInTheDocument();
});