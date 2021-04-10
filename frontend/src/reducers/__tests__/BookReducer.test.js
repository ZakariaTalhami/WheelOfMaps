import {
    BOOKS_LOADED,
    BOOK_SELECTED,
    CHAPTER_SELECTED,
} from "../../actions/types";
import Book from "../../models/book";
import BookReducer from "../BookReducer";

const INTIAL_STATE = {
    books: {
        "Book 1": { seriesIndex: 1 },
        "Book 2": { seriesIndex: 2 },
        "Book 3": { seriesIndex: 3 },
    },
    selectedBook: "Book 2",
    selectedChapter: 3,
    selectedChapterIndex: "02003",
};

const MOCK_BOOK = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    title: "bookTile",
    series: "seriesTitle",
    seriesIndex: 1,
    author: "bookAuthor",
    publishDate: "BookPublishDate",
    chapters: [],
};

const MOCK_BOOK_2 = {
    ...MOCK_BOOK,
    title: "bookTile 2",
    seriesIndex: 2,
};

test("Returns initial state", () => {
    expect(BookReducer(undefined, {})).toEqual({
        books: {},
        selectedBook: undefined,
        selectedChapter: undefined,
        selectedChapterIndex: undefined,
    });
});

test("Book selection", () => {
    expect(
        BookReducer(INTIAL_STATE, {
            type: BOOK_SELECTED,
            book: "Book 1",
        })
    ).toEqual({
        books: INTIAL_STATE.books,
        selectedBook: "Book 1",
        selectedChapter: 0,
        selectedChapterIndex: "01000",
    });
});

test("Chapter selection", () => {
    expect(
        BookReducer(INTIAL_STATE, {
            type: CHAPTER_SELECTED,
            index: 4,
        })
    ).toEqual({
        books: INTIAL_STATE.books,
        selectedBook: INTIAL_STATE.selectedBook,
        selectedChapter: 4,
        selectedChapterIndex: "02004",
    });
});

test("Books load action is empty", () => {
    const newState = BookReducer(INTIAL_STATE, {
        type: BOOKS_LOADED,
        books: [],
    });

    const newState2 = BookReducer(INTIAL_STATE, {
        type: BOOKS_LOADED,
        books: undefined,
    });

    expect(Object.keys(newState.books).length).toEqual(0);
    expect(Object.keys(newState2.books).length).toEqual(0);
});

test("Books loaded", () => {
    const newState = BookReducer(INTIAL_STATE, {
        type: BOOKS_LOADED,
        books: [MOCK_BOOK, MOCK_BOOK_2],
    });

    expect(Object.keys(newState.books).length).toEqual(2);
    Object.values(newState.books).forEach((book) => {
        expect(book).toBeInstanceOf(Book);
    });

    expect(newState).toMatchObject({
        selectedBook: MOCK_BOOK.title,
        selectedChapter: 0,
        selectedChapterIndex: "01000",
    });
});
