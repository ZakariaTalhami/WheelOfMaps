// Action types
import {
    BACK_CHAPTER,
    BOOKS_LOADED,
    BOOK_SELECTED,
    CHAPTER_SELECTED,
    NEXT_CHAPTER,
} from "../../actions/types";
//Models
import Book from "../../models/book";
// Tested components
import BookReducer from "../BookReducer";

const INTIAL_STATE = {
    books: {
        "Book 1": {
            title: "Book 1",
            seriesIndex: 1,
            chapters: [
                {
                    number: 1,
                    index: "01001",
                },
                {
                    number: 2,
                    index: "01002",
                },
            ],
        },
        "Book 2": {
            title: "Book 2",
            seriesIndex: 2,
            chapters: [
                {
                    number: 1,
                    index: "02001",
                },
                {
                    number: 2,
                    index: "02002",
                },
            ],
        },
        "Book 3": {
            title: "Book 3",
            seriesIndex: 3,
            chapters: [
                {
                    number: 1,
                    index: "03001",
                },
                {
                    number: 2,
                    index: "03002",
                },
            ],
        },
    },
    selectedBook: "Book 2",
    selectedChapter: 2,
    selectedChapterIndex: "02002",
};

const MOCK_CHAPTER = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    number: 1,
    title: "title",
    summary: "summary",
    chapterIndex: "01001",
};

const MOCK_BOOK = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    title: "bookTile",
    series: "seriesTitle",
    seriesIndex: 1,
    author: "bookAuthor",
    publishDate: "BookPublishDate",
    chapters: [MOCK_CHAPTER],
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
        selectedChapter: 1,
        selectedChapterIndex: "01001",
    });
});

test("Chapter selection", () => {
    expect(
        BookReducer(INTIAL_STATE, {
            type: CHAPTER_SELECTED,
            index: 2,
        })
    ).toEqual({
        books: INTIAL_STATE.books,
        selectedBook: INTIAL_STATE.selectedBook,
        selectedChapter: 2,
        selectedChapterIndex: "02002",
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
        selectedChapter: 1,
        selectedChapterIndex: "01001",
    });
});

describe("Back chatper", () => {
    test("goes to previous chapter in book when in middle of book", () => {
        expect(
            BookReducer(INTIAL_STATE, {
                type: BACK_CHAPTER,
            })
        ).toMatchObject({
            selectedBook: INTIAL_STATE.selectedBook,
            selectedChapter: 1,
            selectedChapterIndex: "02001",
        });
    });

    test("goes to last chapter in previous book when at the beginning of a book", () => {
        expect(
            BookReducer(
                {
                    ...INTIAL_STATE,
                    selectedChapter: 1,
                    selectedChapterIndex: "02001",
                },
                {
                    type: BACK_CHAPTER,
                }
            )
        ).toMatchObject({
            selectedBook: "Book 1",
            selectedChapter: 2,
            selectedChapterIndex: "01002",
        });
    });

    test("does nothing when first chapter of first book", () => {
        const currentState = {
            selectedBook: "Book 1",
            selectedChapter: 1,
            selectedChapterIndex: "01001",
        };
        expect(
            BookReducer(
                {
                    ...INTIAL_STATE,
                    ...currentState,
                },
                {
                    type: BACK_CHAPTER,
                }
            )
        ).toMatchObject(currentState);
    });
});

describe("Next chatper", () => {
    test("goes to next chapter in book when in middle of book", () => {
        expect(
            BookReducer(
                {
                    ...INTIAL_STATE,
                    selectedChapter: 1,
                    selectedChapterIndex: "02001",
                },
                {
                    type: NEXT_CHAPTER,
                }
            )
        ).toMatchObject({
            selectedBook: INTIAL_STATE.selectedBook,
            selectedChapter: 2,
            selectedChapterIndex: "02002",
        });
    });

    test("goes to first chapter in next book when at the end of a book", () => {
        expect(
            BookReducer(INTIAL_STATE, {
                type: NEXT_CHAPTER,
            })
        ).toMatchObject({
            selectedBook: "Book 3",
            selectedChapter: 1,
            selectedChapterIndex: "03001",
        });
    });

    test("does nothing when last chapter of last book", () => {
        const correntState = {
            selectedBook: "Book 3",
            selectedChapter: 2,
            selectedChapterIndex: "03002",
        };
        expect(
            BookReducer(
                {
                    ...INTIAL_STATE,
                    ...correntState,
                },
                {
                    type: NEXT_CHAPTER,
                }
            )
        ).toMatchObject(correntState);
    });
});
