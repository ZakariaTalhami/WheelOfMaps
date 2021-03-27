import React from "react";
import { render, fireEvent, screen } from "../../../../../utils/TestUtils";
import NavButton from "../NavButton";

test("renders", () => {
    render(<NavButton>Button</NavButton>);
});

test("is Clickable", () => {
    const clickHandler = jest.fn();
    render(
        <NavButton onClick={clickHandler} children="Button">
            Button
        </NavButton>
    );

    expect(clickHandler).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button"));

    expect(clickHandler).toHaveBeenCalled();
});

test("matches snapshot - no selection", () => {
    const { container } = render(<NavButton>Button</NavButton>);

    expect(container).toMatchSnapshot();
});
