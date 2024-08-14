import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { addDoc, getDocs } from "firebase/firestore";
import TextInput from "./TextInput";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn()
}));

jest.mock("../firebase", () => ({
  db: jest.fn()
}));

jest.mock("./Button", () => ({
  __esModule: true,
  default: ({
    handleOnClick,
    disabled
  }: {
    handleOnClick: () => void;
    disabled: boolean;
  }) =>
    <button onClick={handleOnClick} disabled={disabled}>
      Enviar
    </button>
}));

describe("TextInput Component", () => {
  beforeEach(() => {
    (addDoc as jest.Mock).mockClear();
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          data: () => ({
            content: "Test Message",
            timestamp: "2024-08-14T12:00:00Z"
          })
        }
      ]
    });
  });

  it("should render the TextInput component without crashing", () => {
    const { getByPlaceholderText } = render(<TextInput />);
    expect(getByPlaceholderText("Digite um texto*")).toBeInTheDocument();
  });

  it("should focus on the input field and change the label when typing", () => {
    const { getByPlaceholderText, getByText } = render(<TextInput />);
    const input = getByPlaceholderText("Digite um texto*");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Hello World" } });

    expect(getByText("Mensagem*")).toBeInTheDocument();
    expect(input).toHaveValue("Hello World");
  });

  it("should add a message to Firestore when the button is clicked", async () => {
    const { getByText, getByPlaceholderText } = render(<TextInput />);
    const input = getByPlaceholderText("Digite um texto*");
    const button = getByText("Enviar");

    fireEvent.change(input, { target: { value: "Test Message" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
        content: "Test Message",
        timestamp: expect.any(String)
      });
    });
  });

  it("should fetch and display messages from Firestore on load", async () => {
    const { getByText } = render(<TextInput />);

    await waitFor(() => {
      expect(getByText("Test Message")).toBeInTheDocument();
    });
  });

  it("should disable the button when input is empty", () => {
    const { getByText, getByPlaceholderText } = render(<TextInput />);
    const input = getByPlaceholderText("Digite um texto*");
    const button = getByText("Enviar");

    fireEvent.change(input, { target: { value: "" } });

    expect(button).toBeDisabled();
  });
});
