// Core
import React from "react";
// Libs
import { render, screen } from "../../../../../utils/TestUtils";
import { useSelector } from "react-redux";
// Mocks
import mockLocation from "../../../../../models/mocks/mockLocation";
import mockCharacter from "../../../../../models/mocks/mockCharacter";
import LocationView from "../LocationView";
import CharacterView from "../CharacterView";
// Tested Component
import EntityViewer from "../EntityViewer";
import { NO_SELECTION_MESSAGE } from "../../../../../components/entityFactory/EntityViewFactory";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

jest.mock("../LocationView");
jest.mock("../CharacterView");

const getMockState = (options = {}) => ({
    Navigation: {
        selectedEntity: options.entity,
    },
});

beforeEach(() => {
    LocationView.mockReturnValue("LocationView");
    CharacterView.mockReturnValue("CharacterView");
});

test("Display message when nothing is selected", () => {
    render(<EntityViewer />);

    expect(screen.getByText(NO_SELECTION_MESSAGE)).toBeDefined();
    expect(screen.getByTestId("no-selection-message")).toBeDefined();
});

test("Renders the location component", () => {
    const mockState = getMockState({ entity: mockLocation });
    useSelector.mockImplementation((fn) => fn(mockState));

    render(<EntityViewer />);

    expect(screen.getByText("LocationView")).toBeDefined();
});

test("Renders the character component", () => {
    const mockState = getMockState({ entity: mockCharacter });
    useSelector.mockImplementation((fn) => fn(mockState));

    render(<EntityViewer />);

    expect(screen.getByText("CharacterView")).toBeDefined();
});
