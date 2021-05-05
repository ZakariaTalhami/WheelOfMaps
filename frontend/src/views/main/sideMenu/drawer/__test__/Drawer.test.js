// Core
import React from "react";
// Libs
import { fireEvent, render, screen } from "../../../../../utils/TestUtils";
import { useBreakpointValue } from "@chakra-ui/react";
// Tested Component
import Drawer from "../Drawer";

jest.mock("@chakra-ui/react", () => ({
    ...jest.requireActual("@chakra-ui/react"),
    useBreakpointValue: jest.fn(),
}));

test("drawer is closed when there isnt content", () => {
    render(<Drawer content={null} />);

    expect(screen.getByTestId("side-drawer")).toHaveStyle(
        "transform: translate(-170%)"
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

describe("Mobile Drawer", () => {
    beforeEach(() => {
        useBreakpointValue.mockReturnValue(true);
    });

    test("renders in mobile view", () => {
        render(<Drawer />);

        expect(screen.getByTestId("side-drawer-mobile")).toBeDefined();
        // Drawer should be closed
        expect(screen.getByTestId("side-drawer-mobile")).toHaveStyle(
            "top: 150%"
        );
    });

    test("drawer is open", () => {
        const navigation = {
            Content: () => "content",
        };

        render(<Drawer content={navigation} />);

        expect(screen.getByTestId("side-drawer-mobile")).toBeDefined();
        expect(screen.getByTestId("side-drawer-mobile")).toHaveStyle(
            "top: 50%"
        );
    });

    test("mobile matches snapshot", () => {
        const navigation = {
            Content: () => "content",
        };
        const { container } = render(<Drawer content={navigation} />);

        expect(container).toMatchSnapshot();
    });
});

test("matches snapshot", () => {
    const navigation = {
        Content: () => "content",
    };
    const { container } = render(<Drawer content={navigation} />);

    expect(container).toMatchSnapshot();
});
