import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import Logo from "../assets/logo.svg";

describe("Header Component", () => {
  it("should render the Header component without crashing", () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });

  it("should display the logo image with correct alt text", () => {
    const { getByAltText } = render(<Header />);
    const image = getByAltText("Logo") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(Logo);
  });

  it("should apply the correct styles to the HeaderContainer", () => {
    const { container } = render(<Header />);
    const headerContainer = container.firstChild as HTMLElement;
    expect(headerContainer).toHaveStyle("display: flex");
    expect(headerContainer).toHaveStyle("justify-content: center");
    expect(headerContainer).toHaveStyle("align-items: flex-start");
    expect(headerContainer).toHaveStyle("padding-top: 60px");
  });

  it("should apply the correct styles to the HeaderImage", () => {
    const { getByAltText } = render(<Header />);
    const image = getByAltText("Logo") as HTMLElement;
    expect(image).toHaveStyle("max-width: 95%");
    expect(image).toHaveStyle("height: auto");
    expect(image).toHaveStyle("display: block");
  });
});
