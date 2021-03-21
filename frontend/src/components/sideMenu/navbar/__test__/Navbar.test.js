import React from "react";
import { fireEvent, render, screen } from "../../../../utils/TestUtils";
import { NAVIGATION } from "../../navigation";
import Navbar from "../Navbar";

test("renders all the navigation links", () => {
    render(<Navbar navigation={NAVIGATION} />);

    expect(screen.getAllByRole("link").length).toEqual(NAVIGATION.length);
});

test("Hover over link renders tooltip", async () => {
    render(<Navbar navigation={NAVIGATION} />);

    const links = screen.getAllByRole("link");
    fireEvent.mouseOver(links[0]);

    await screen.findByRole("tooltip");
    expect(screen.getByText(NAVIGATION[0].label)).toBeInTheDocument();
});

test("Navigation shows selection indicator", () => {
    const selectedNavigation = NAVIGATION[0].name;
    render(<Navbar navigation={NAVIGATION} selected={selectedNavigation} />);

    expect(screen.getAllByRole("link")[0]).toHaveStyle(
        "border-color: var(--chakra-colors-neutralColor)"
    );
});

test("Clicking triggers selection", () => {
    const onSelect = jest.fn();
    render(<Navbar navigation={NAVIGATION} onSelect={onSelect} />);

    const links = screen.getAllByRole("link");
    fireEvent.click(links[0]);

    expect(onSelect).toHaveBeenCalledWith(NAVIGATION[0].name);

    fireEvent.click(links[1]);

    expect(onSelect).toHaveBeenCalledWith(NAVIGATION[1].name);
});

test("matches snapshot - no selection", () => {
    const { container } = render(<Navbar navigation={NAVIGATION} />);

    expect(container).toMatchSnapshot();
});

test("matches snapshot - with selection", () => {
    const selectedNavigation = NAVIGATION[0].name;
    const { container } = render(
        <Navbar navigation={NAVIGATION} selected={selectedNavigation} />
    );

    expect(container).toMatchSnapshot();
});
