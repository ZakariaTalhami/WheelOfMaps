import React from "react";
import { fireEvent, render, screen, within } from "../../../utils/TestUtils";
import { NAVIGATION } from "../navigation";
import SideMenu from "../SideMenu";
import { useSelector } from "react-redux";
import { setSelectedNavigation } from "../../../actions/NavigationAction";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

const getMockState = (option = {}) => ({
    Navigation: {
        selectedEntity: option.entity || null,
        selectedNavigation: option.nav || null,
    },
});

// Mock the content component of navigations
beforeEach(() => {
    NAVIGATION.forEach((nav) => {
        nav.Content = jest.fn().mockReturnValue("");
    });
});

test("renders", () => {
    useSelector.mockImplementation((fn) => fn(getMockState()));

    render(<SideMenu />);

    expect(screen.getByRole("navigation")).toBeDefined();
    expect(screen.getByTestId("side-drawer")).toBeDefined();
});

describe("Clicking on the navigation link", () => {
    test("Dispatches action with navigation name", () => {
        useSelector.mockImplementation((fn) => fn(getMockState()));
        render(<SideMenu />);

        NAVIGATION.forEach((nav) => {
            const navLink = screen.getByTitle(nav.label);

            // Click on navigation link to open
            fireEvent.click(navLink);

            // Check dispatch call
            expect(mockDispatch).toBeCalledWith(
                setSelectedNavigation(nav.name)
            );
            mockDispatch.mockClear();
        });
    });

    test("Selected link dispatches action with null", () => {
        const nav = NAVIGATION[0];
        const mockState = getMockState({ nav: nav.name });
        useSelector.mockImplementation((fn) => fn(mockState));

        render(<SideMenu />);

        const navLink = screen.getByTitle(nav.label);

        fireEvent.click(navLink);

        // Check Drawer content
        expect(mockDispatch).toBeCalledWith(setSelectedNavigation(null));
    });
});

describe("Drawer open state depends on selected navigation", () => {
    test("Drawer is closed when selected navigation is null", () => {
        useSelector.mockImplementation((fn) => fn(getMockState()));

        render(<SideMenu />);

        const drawer = screen.getByTestId("side-drawer");
        expect(drawer).toHaveStyle("transform: translate(-170%)");
    });

    test("Drawer is opened when selected navigation is not null", () => {
        const nav = NAVIGATION[0];
        const mockState = getMockState({ nav: nav.name });
        useSelector.mockImplementation((fn) => fn(mockState));

        render(<SideMenu />);

        const drawer = screen.getByTestId("side-drawer");
        expect(drawer).toHaveStyle("transform: translate(0)");
    });
});

test("closed is called from drawer", () => {
    const nav = NAVIGATION[0];
    const mockState = getMockState({ nav: nav.name });
    useSelector.mockImplementation((fn) => fn(mockState));

    render(<SideMenu />);

    const drawer = screen.getByTestId("side-drawer");

    // Click on the close button inside of the drawer
    fireEvent.click(within(drawer).getByRole("button"));

    // Remove selected navigation
    expect(mockDispatch).toHaveBeenCalledWith(setSelectedNavigation(null));
});
