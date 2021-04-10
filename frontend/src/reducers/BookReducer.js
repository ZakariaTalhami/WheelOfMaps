import {
    BOOKS_LOADED,
    BOOK_SELECTED,
    CHAPTER_SELECTED,
} from "../actions/types";
import _ from "lodash";
import Book from "../models/book";
import { zeroPad } from "../utils/NumberUtils";

const INTIAL_STATE = {
    books: {},
    selectedBook: undefined,
    selectedChapter: undefined,
    selectedChapterIndex: undefined,
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

const getChapterIndex = (chapter, book) => {
    return `${zeroPad(book, 2)}${zeroPad(chapter, 3)}`;
};

const getBookIndexFromState = (bookTitle, books) => {
    return books[bookTitle] ? books[bookTitle].seriesIndex : -1;
};

const BookReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case BOOK_SELECTED:
            return {
                ...state,
                selectedBook: action.book,
                selectedChapter: 0,
                selectedChapterIndex: getChapterIndex(
                    0,
                    getBookIndexFromState(action.book, state.books)
                ),
            };

        case CHAPTER_SELECTED:
            return {
                ...state,
                selectedChapter: action.index,
                selectedChapterIndex: getChapterIndex(
                    action.index,
                    getBookIndexFromState(state.selectedBook, state.books)
                ),
            };

        case BOOKS_LOADED:
            const bookModels = [];
            if (_.isArray(action.books)) {
                bookModels.push.apply(
                    bookModels,
                    action.books.map((book) => Book.ConstructFromObject(book))
                );
            }

            const bookMapping = rawBookHandler(bookModels);
            return {
                ...state,
                books: bookMapping,
                selectedBook: getFirstBook(bookModels),
                selectedChapter: 0,
                selectedChapterIndex: getChapterIndex(
                    0,
                    getBookIndexFromState(getFirstBook(bookModels), bookMapping)
                ),
            };
        default:
            return state;
    }
};

export default BookReducer;
