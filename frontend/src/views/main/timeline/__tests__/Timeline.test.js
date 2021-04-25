// Core
import React from "react";
import { fireEvent, render, screen } from "../../../../utils/TestUtils";
import { useSelector } from "react-redux";
// Action Types
import { nextChapter, previousChapter } from "../../../../actions/BookActions";
// Tested components
import Timeline from "../Timeline";

const MOCK_BOOKS = {
    "Book 1": {
        chapters: [
            {
                number: 1,
                title: "title 1",
            },
            {
                number: 2,
                title: "title 1",
            },
        ],
    },
    "Book 2": {
        chapters: [
            {
                number: 1,
                title: "title 2",
            },
            {
                number: 2,
                title: "title 2",
            },
        ],
    },
};

const MOCK_BOOK_STATE = {
    books: MOCK_BOOKS,
    selectedBook: "Book 1",
    selectedChapter: 0,
};

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

beforeEach(() => {
    useSelector.mockReturnValue(MOCK_BOOK_STATE);
});

test("renders", () => {
    render(<Timeline />);

    // navigation buttons render
    expect(screen.getAllByRole("button").length).toEqual(2);
    expect(screen.getByLabelText("Next Chapter")).toBeDefined();
    expect(screen.getByLabelText("Previous Chapter")).toBeDefined();

    // selects render
    expect(screen.getByTestId("book-select")).toBeDefined();
    expect(screen.getByTestId("chapter-select")).toBeDefined();
});

test("clicking back button dispatchs back action", () => {
    render(<Timeline />);

    fireEvent.click(screen.getByTestId("back-button"));

    expect(mockDispatch).toHaveBeenCalledWith(previousChapter());
});

test("clicking next button dispatchs next action", () => {
    render(<Timeline />);

    fireEvent.click(screen.getByTestId("next-button"));

    expect(mockDispatch).toHaveBeenCalledWith(nextChapter());
});

test("match snapshot", () => {
    const { container } = render(<Timeline />);

    expect(container).toMatchSnapshot();
});
