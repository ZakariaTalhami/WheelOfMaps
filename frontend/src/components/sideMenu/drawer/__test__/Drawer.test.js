import React from "react";
import { fireEvent, render, screen } from "../../../../utils/TestUtils";
import Drawer from "../Drawer";

test("drawer is closed when there isnt content", () => {
    render(<Drawer content={null} />);

    expect(screen.getByTestId("side-drawer")).toHaveStyle(
        "transform: translate(-150%)"
    );
});

test("drawer is open and renders content", () => {
    const navigation = {
        Content: () => "content",
    };
    render(<Drawer content={navigation} />);

    expect(screen.getByTestId("side-drawer")).toHaveStyle(
        "transform: translate(0)"
    );
    expect(screen.getByText("content")).toBeInTheDocument();
});

test("drawer handles close event", () => {
    const onClose = jest.fn();
    const navigation = {
        Content: () => "content",
    };
    render(<Drawer content={navigation} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClose).toHaveBeenCalled();
});

test("matches snapshot", () => {
    const navigation = {
        Content: () => "content",
    };
    const { container } = render(<Drawer content={navigation} />);

    expect(container).toMatchSnapshot();
});
