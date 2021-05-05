// Core
import React from "react";
// Libs
import { render, screen, within } from "../../../../../utils/TestUtils";
import { useSelector } from "react-redux";
// Mocks
import mockLocation from "../../../../../models/mocks/mockLocation";
// Tested Component
import LocationView from "../LocationView";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

const getMockState = (options = {}) => ({
    Books: {
        selectedChapterIndex: options.chapter,
    },
});

test("Finds description for selected chapter", () => {
    const mockState = getMockState({ chapter: "01008" });
    useSelector.mockImplementation((fn) => fn(mockState));

    render(<LocationView entity={mockLocation} />);

    const header = screen.getByRole("heading");
    const paragraphs = screen.queryAllByRole("paragraph");

    expect(header).toBeDefined();
    expect(within(header).getByText(mockLocation.name)).toBeDefined();
    expect(paragraphs.length).toEqual(2);
});

test("doesnt find description for selected chapter", () => {
    const mockState = getMockState({ chapter: "01011" });
    useSelector.mockImplementation((fn) => fn(mockState));

    render(<LocationView entity={mockLocation} />);

    const header = screen.getByRole("heading");
    const paragraphs = screen.queryAllByRole("paragraph");

    expect(header).toBeDefined();
    expect(within(header).getByText(mockLocation.name)).toBeDefined();
    expect(paragraphs.length).toEqual(0);
});

test("Matches the snapshot", () => {
    const { container } = render(<LocationView entity={mockLocation} />);

    expect(container).toMatchSnapshot();
});
