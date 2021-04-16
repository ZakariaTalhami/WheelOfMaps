// Core
import React from "react";
// Libs
import { render, screen } from "../../../../utils/TestUtils";
import { useSelector } from "react-redux";
// Mocks
import mockLocation from "../../../../models/mocks/mockLocation";
import mockCharacter from "../../../../models/mocks/mockCharacter";
// Tested Component
import EntityViewer, { NO_SELECTION_MESSAGE } from "../EntityViewer";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

test("Display message when nothing is selected", () => {
    render(<EntityViewer />);

    expect(screen.getByText(NO_SELECTION_MESSAGE)).toBeDefined();
    expect(screen.getByTestId("no-selection-message")).toBeDefined();
});

test("Renders the location component", () => {
    useSelector.mockReturnValue(mockLocation);

    render(<EntityViewer />);

    expect(screen.getByText("Location Entity")).toBeDefined();
});

test("Renders the character component", () => {
    useSelector.mockReturnValue(mockCharacter);

    render(<EntityViewer />);

    expect(screen.getByText("Character Entity")).toBeDefined();
});
