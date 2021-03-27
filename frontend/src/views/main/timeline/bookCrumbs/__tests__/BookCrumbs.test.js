import React from "react";
import {
    setSelectedBook,
    setSelectedChapter,
} from "../../../../../actions/BookActions";
import {
    fireEvent,
    cleanup,
    render,
    screen,
    within,
} from "../../../../../utils/TestUtils";
import BookCrumbs from "../BookCrumbs";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
}));

const MockBooks = {
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

beforeEach(() => {
    render(<BookCrumbs books={MockBooks} selectedBook="Book 1" />);
});

test("renders", () => {
    const bookSelect = screen.getByTestId("book-select");
    const chapterSelect = screen.getByTestId("chapter-select");

    // Dropdowns Render
    expect(bookSelect).toBeDefined();
    expect(chapterSelect).toBeDefined();

    // Options Render
    expect(within(bookSelect).getAllByTestId("option").length).toEqual(2);
    expect(within(chapterSelect).getAllByTestId("option").length).toEqual(2);

    // Correct Selections
    expect(bookSelect.value).toEqual("Book 1");
});

test("Book 2: Chapter 2 selected in props", () => {
    cleanup();
    render(
        <BookCrumbs
            books={MockBooks}
            selectedBook="Book 2"
            selectedChapter="1"
        />
    );

    const bookSelect = screen.getByTestId("book-select");
    const chapterSelect = screen.getByTestId("chapter-select");

    expect(bookSelect.value).toEqual("Book 2");
    expect(chapterSelect.value).toEqual("Chapter 2: title 2");
});

test("dispatch selection of book", () => {
    fireEvent.change(screen.getByTestId("book-select"), {
        target: { value: "Book 2" },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedBook("Book 2"));
});

test("dispatch selection of chapter", () => {
    fireEvent.change(screen.getByTestId("chapter-select"), {
        target: { value: "Chapter 2: title 1" },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedChapter(1));
});

test("match snapshot", () => {
    cleanup();
    const { container } = render(
        <BookCrumbs books={MockBooks} selectedBook="Book 1" />
    );

    expect(container).toMatchSnapshot();
});
