// Core
import React from "react";
// Libs
import { render, screen } from "../../../utils/TestUtils";
import NotImplementedMessage from "../NotImplementedMessage";

test("Renders", () => {
    render(<NotImplementedMessage />);

    expect(screen.getByText("Not Implemented Yet")).toBeDefined();
});

test("matches snapshot", () => {
    const { container } = render(<NotImplementedMessage />);

    expect(container).toMatchSnapshot();
});
