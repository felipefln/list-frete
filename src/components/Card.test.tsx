import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";

describe("Card Component", () => {
  test("renders content correctly", () => {
    const content = "Este é o conteúdo do card.";
    const timestamp = "2024-08-13T19:54:04.458Z";

    render(<Card content={content} timestamp={timestamp} />);

    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
  });

  test("renders formatted date and time correctly", () => {
    const content = "Este é o conteúdo do card.";
    const timestamp = "2024-08-13T19:54:04.458Z";
    const formattedDate = "13/08/2024 - 19:54";

    render(<Card content={content} timestamp={timestamp} />);

    const dateElement = screen.getByText(formattedDate);
    expect(dateElement).toBeInTheDocument();
  });
});
