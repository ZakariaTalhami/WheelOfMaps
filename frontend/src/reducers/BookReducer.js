import {
    BOOKS_LOADED,
    BOOK_SELECTED,
    CHAPTER_SELECTED,
} from "../actions/types";
import _ from "lodash";

const mockState = {
    books: {
        "Eye of the world": [
            "Chapter 1",
            "Chapter 2",
            "Chapter 3",
            "Chapter 4",
            "Chapter 5",
        ],
        "Great Hunt": ["Chapter 1", "Chapter 2", "Chapter 3"],
        "The dragon reborn": [
            "Chapter 1",
            "Chapter 2",
            "Chapter 3",
            "Chapter 4",
            "Chapter 5",
            "Chapter 6",
            "Chapter 7",
        ],
    },
    selectedBook: undefined,
    selectedChapter: undefined,
};

const rawBookHandler = (books) => {
    const rawBooksData = {};
    if (_.isArray(books)) {
        _.each(books, (bookData) => {
            rawBooksData[bookData.title] = bookData;
        });
    }
    return rawBooksData;
};

const getFirstBook = (books) => {
    const firstBook = _.first(books);
    return firstBook ? firstBook.title : undefined;
};

const BookReducer = (state = mockState, action) => {
    switch (action.type) {
        case BOOK_SELECTED:
            return {
                ...state,
                selectedBook: action.book,
                selectedChapter: 0,
            };

        case CHAPTER_SELECTED:
            return {
                ...state,
                selectedChapter: action.index,
            };

        case BOOKS_LOADED:
            return {
                ...state,
                books: rawBookHandler(action.books),
                selectedBook: getFirstBook(action.books),
                selectedChapter: 0,
            };
        default:
            return state;
    }
};

export default BookReducer;
