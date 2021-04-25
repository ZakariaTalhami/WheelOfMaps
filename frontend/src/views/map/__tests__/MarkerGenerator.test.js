// Core
import React from "react";
import { useSelector } from "react-redux";
// Libs
import { render, screen } from "../../../utils/TestUtils";
// Models
import Location from "../../../models/location";
// Tested Component
import MarkerGenerator from "../MarkerGenerator";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

const MOCK_MARKER = {
    icon: "path/to/icon",
    size: [32, 32],
    anchor: [16, 16],
    rotation: 0,
};

const MOCk_LOCATION = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    name: "magic city",
    position: [0, 0],
    description: [
        {
            chapterRange: "01005-01010",
        },
    ],
    marker: MOCK_MARKER,
};

const getMockState = (options) => {
    return {
        Locations: {
            locations: Array(5).fill(
                Location.ConstructFromObject(MOCk_LOCATION)
            ),
        },
        Characters: {},
        Books: {
            selectedChapterIndex: options.chapterIndex || "01005",
        },
    };
};

beforeEach(() => {
    Location.prototype.renderMarker = jest
        .fn()
        .mockReturnValue(<div data-testid="location-marker" />);
});

test("generates all the markers in the state", () => {
    const mockState = getMockState({ locations: 5 });
    useSelector.mockImplementation((fn) => fn(mockState));

    render(<MarkerGenerator />);

    const locationMarkers = screen.getAllByTestId("location-marker");

    expect(locationMarkers.length).toEqual(5);
});

describe("Generates markers depending on chapter inclusion", () => {
    test("selected chapter index before range", () => {
        const mockState = getMockState({ locations: 5, chapterIndex: "01002" });
        useSelector.mockImplementation((fn) => fn(mockState));

        render(<MarkerGenerator />);

        const locationMarkers = screen.queryAllByTestId("location-marker");

        expect(locationMarkers.length).toEqual(0);
    });

    test("selected chapter index in range", () => {
        const mockState = getMockState({ locations: 5, chapterIndex: "01006" });
        useSelector.mockImplementation((fn) => fn(mockState));

        render(<MarkerGenerator />);

        const locationMarkers = screen.queryAllByTestId("location-marker");

        expect(locationMarkers.length).toEqual(5);
    });

    test("selected chapter index after range", () => {
        const mockState = getMockState({ locations: 5, chapterIndex: "01012" });
        useSelector.mockImplementation((fn) => fn(mockState));

        render(<MarkerGenerator />);

        const locationMarkers = screen.queryAllByTestId("location-marker");

        expect(locationMarkers.length).toEqual(0);
    });
});
