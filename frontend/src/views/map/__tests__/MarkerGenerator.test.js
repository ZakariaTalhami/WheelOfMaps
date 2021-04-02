import React from "react";
import { render, screen } from "../../../utils/TestUtils";
import Location from "../../../models/location";
import { useSelector } from "react-redux";
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
    description: {},
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
    };
};

let mockKey = 1;
beforeEach(() => {
    Location.prototype.renderMarker = jest
        .fn()
        .mockReturnValue(<div key={mockKey++} data-testid="location-marker" />);
});

test("generates all the markers in the state", () => {
    const mockState = getMockState({ locations: 5 });
    useSelector.mockImplementation((fn) => fn(mockState));

    render(<MarkerGenerator />);

    const locationMarkers = screen.getAllByTestId("location-marker");

    expect(locationMarkers.length).toEqual(5);
});
