import React from "react";
import { fireEvent, render, screen, within } from "../../../utils/TestUtils";
import { NAVIGATION } from "../navigation";
import SideMenu from "../SideMenu";

beforeEach(() => render(<SideMenu />));

test("renders", () => {
    expect(screen.getByRole("navigation")).toBeDefined();
    expect(screen.getByTestId("side-drawer")).toBeDefined();
});

test("Clicking on the navigation link opens/closes the drawer", () => {
    NAVIGATION.forEach((nav) => {
        const navLink = screen.getByTitle(nav.label);
        const drawer = screen.getByTestId("side-drawer");

        // Click on navigation link to open
        fireEvent.click(navLink);

        // Check Drawer open
        expect(drawer).toHaveStyle("transform: translate(0)");

        // Check Drawer content
        expect(drawer).toContainHTML(nav.Content());

        // Click on navigation link to close
        fireEvent.click(navLink);

        // Check Drawer closed
        expect(drawer).toHaveStyle("transform: translate(-170%)");
    });
});

test("closed is called from drawer", () => {
    const drawer = screen.getByTestId("side-drawer");

    // Click on navigation link to open
    fireEvent.click(screen.getByTitle(NAVIGATION[0].label));

    // Check Drawer open
    expect(drawer).toHaveStyle("transform: translate(0)");

    // Click on the close button inside of the drawer
    fireEvent.click(within(drawer).getByRole("button"));

    // Check Drawer closed
    expect(drawer).toHaveStyle("transform: translate(-170%)");
});
