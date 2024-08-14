import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("Button Component", () => {
  test("renders the button with correct text", () => {
    render(<Button disabled={false} handleOnClick={jest.fn()} />);

    const buttonElement = screen.getByRole("button", { name: /enviar/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Enviar");
  });

  test("button is disabled when disabled prop is true", () => {
    render(<Button disabled={true} handleOnClick={jest.fn()} />);

    const buttonElement = screen.getByRole("button", { name: /enviar/i });
    expect(buttonElement).toBeDisabled();
  });

  test("button is enabled when disabled prop is false", () => {
    render(<Button disabled={false} handleOnClick={jest.fn()} />);

    const buttonElement = screen.getByRole("button", { name: /enviar/i });
    expect(buttonElement).toBeEnabled();
  });

  test("calls handleOnClick when button is clicked and not disabled", () => {
    const handleClick = jest.fn();
    render(<Button disabled={false} handleOnClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call handleOnClick when button is clicked and disabled", () => {
    const handleClick = jest.fn();
    render(<Button disabled={true} handleOnClick={handleClick} />);

    const buttonElement = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
