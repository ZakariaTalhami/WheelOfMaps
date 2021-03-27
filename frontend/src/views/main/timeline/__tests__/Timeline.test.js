import React from "react";
import {
    setSelectedBook,
    setSelectedChapter,
} from "../../../../actions/BookActions";
import { fireEvent, render, screen } from "../../../../utils/TestUtils";
import Timeline from "../Timeline";
import { useSelector } from "react-redux";

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

test("handle back action - stop at first book", () => {
    render(<Timeline />);

    fireEvent.click(screen.getByTestId("back-button"));

    expect(mockDispatch).not.toHaveBeenCalled();
});

test("handle back action - goes to previous book", () => {
    useSelector.mockReturnValue({
        ...MOCK_BOOK_STATE,
        selectedBook: "Book 2",
    });

    render(<Timeline />);

    fireEvent.click(screen.getByTestId("back-button"));

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedBook("Book 1"));
});

test("handle back action - goes to previous chapter", () => {
    useSelector.mockReturnValue({
        ...MOCK_BOOK_STATE,
        selectedChapter: 1,
    });
    render(<Timeline />);

    fireEvent.click(screen.getByTestId("back-button"));

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedChapter(0));
});

test("handle next action - stop at last book and chapter", () => {
    useSelector.mockReturnValue({
        ...MOCK_BOOK_STATE,
        selectedBook: "Book 2",
        selectedChapter: 1,
    });

    render(<Timeline />);

    fireEvent.click(screen.getByTestId("next-button"));

    expect(mockDispatch).not.toHaveBeenCalled();
});

test("handle next action - goes to next book", () => {
    useSelector.mockReturnValue({
        ...MOCK_BOOK_STATE,
        selectedChapter: 1,
    });

    render(<Timeline />);

    fireEvent.click(screen.getByTestId("next-button"));

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedBook("Book 2"));
});

test("handle next action - goes to next chapter", () => {
    render(<Timeline />);

    fireEvent.click(screen.getByTestId("next-button"));

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedChapter(1));
});

test("match snapshot", () => {
    const { container } = render(<Timeline />);

    expect(container).toMatchSnapshot();
});
