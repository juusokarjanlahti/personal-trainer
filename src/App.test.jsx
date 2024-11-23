import App from "./App";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

test("renders App component with Customers and Training Sessions headers", () => {
	// Use render() to render the App component for testing
	render(<App />);

	// Check for the Customers header
	const customersHeader = screen.getByText(/Customers/i);
	expect(customersHeader).toBeInTheDocument();

	// Check for the Training Sessions header
	const trainingSessionsHeader = screen.getByText(/Training Sessions/i);
	expect(trainingSessionsHeader).toBeInTheDocument();
});
