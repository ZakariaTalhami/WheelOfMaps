import {
    BOOKS_LOADED,
    BOOK_SELECTED,
    CHAPTER_SELECTED,
} from "../actions/types";
import _ from "lodash";
import Book from "../models/book";

const INTIAL_STATE = {
    books: {},
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

const BookReducer = (state = INTIAL_STATE, action) => {
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
            const bookModels = action.books.map((book) =>
                Book.ConstructFromObject(book)
            );
            return {
                ...state,
                books: rawBookHandler(bookModels),
                selectedBook: getFirstBook(bookModels),
                selectedChapter: 0,
            };
        default:
            return state;
    }
};

export default BookReducer;
