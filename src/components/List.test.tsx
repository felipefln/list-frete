import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import List from "./List";
import Card from "./Card";

jest.mock("./Card", () => ({
  __esModule: true,
  default: ({ content, timestamp }: { content: string; timestamp: string }) =>
    <div data-testid="card">
      <p>
        {content}
      </p>
      <span>
        {timestamp}
      </span>
    </div>
}));

describe("List Component", () => {
  const messages = [
    { content: "First message", timestamp: "2024-08-14T12:00:00Z" },
    { content: "Second message", timestamp: "2024-08-14T13:00:00Z" }
  ];

  it("should render the List component without crashing", () => {
    const { getByText } = render(<List messages={messages} />);
    expect(getByText("Mensagens Enviadas")).toBeInTheDocument();
  });

  it("should render the correct number of messages", () => {
    const { getAllByTestId } = render(<List messages={messages} />);
    const cards = getAllByTestId("card");
    expect(cards).toHaveLength(messages.length);
  });

  it("should display the correct content and timestamp in each Card", () => {
    const { getAllByTestId } = render(<List messages={messages} />);
    const cards = getAllByTestId("card");

    messages.forEach((message, index) => {
      expect(cards[index]).toHaveTextContent(message.content);
      expect(cards[index]).toHaveTextContent(message.timestamp);
    });
  });

  it("should display a title for the list", () => {
    const { getByText } = render(<List messages={messages} />);
    expect(getByText("Mensagens Enviadas")).toBeInTheDocument();
  });
});
