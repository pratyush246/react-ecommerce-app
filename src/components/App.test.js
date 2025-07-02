import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for custom matchers
import App from "./App";

test("renders welcome message", () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to My React App/i);
  expect(headingElement).toBeInTheDocument();
});
