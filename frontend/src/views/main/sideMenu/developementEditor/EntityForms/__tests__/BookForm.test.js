import { useSelector } from "react-redux";
// Utils
import { fireEvent, render, screen } from "../../../../../../utils/TestUtils";
// Tested Component
import BookForm from "../BookForm";

import mockBook from "../../../../../../models/mocks/mockBook";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

beforeEach(() => {
    useSelector.mockReturnValue(mockBook);
});

test("renders", () => {
    render(<BookForm />);

    // Actions
    expect(screen.getByRole("button", { name: "Edit" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Delete" })).toBeDefined();

    // Heading
    expect(screen.getByRole("heading").innerHTML).toEqual("Create Book");

    // Form Fields
    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByRole("field", { name: "Title" })).toBeDefined();

    expect(screen.getByText("Series Number")).toBeDefined();
    expect(screen.getByRole("field", { name: "Series Number" })).toBeDefined();

    expect(screen.getByText("Publish Date")).toBeDefined();
    expect(screen.getByRole("field", { name: "Publish Date" })).toBeDefined();
});

test("Edit", () => {
    render(<BookForm />);

    const heading = screen.getByRole("heading");
    const editActionButton = screen.getByRole("button", { name: "Edit" });
    const titleField = screen.getByRole("field", { name: "Title" });

    expect(heading.innerHTML).toEqual("Create Book");
    expect(titleField.value).toEqual("");

    fireEvent.click(editActionButton);

    expect(heading.innerHTML).toEqual("Edit Book");
    expect(titleField.value).not.toEqual("");
});

// TODO: Add more tests
