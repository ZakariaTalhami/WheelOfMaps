// Core
import React from "react";
// Libs
import { render, screen, within } from "../../../../../utils/TestUtils";
// Mocks
import mockCharacter from "../../../../../models/mocks/mockCharacter";
// Tested Component
import CharacterView from "../CharacterView";

test("Shows the name of chapters as header", () => {
    render(<CharacterView entity={mockCharacter} />);

    const header = screen.getByRole("heading");
    const paragraphs = screen.queryAllByRole("paragraph");

    expect(header).toBeDefined();
    expect(within(header).getByText(mockCharacter.name)).toBeDefined();
    expect(paragraphs.length).toEqual(0);
});
