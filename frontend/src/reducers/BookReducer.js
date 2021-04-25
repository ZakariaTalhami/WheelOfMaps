// Libs
import _ from "lodash";
//Action types
import {
    BACK_CHAPTER,
    BOOKS_LOADED,
    BOOK_SELECTED,
    CHAPTER_SELECTED,
    NEXT_CHAPTER,
} from "../actions/types";
// Models
import Book from "../models/book";

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

// Function handles the action of moving to Next chapter
const hanldeNextTransition = ({
    books,
    selectedBook,
    selectedChapter,
    selectedChapterIndex,
}) => {
    // If last chapter in last book, do nothing
    if (
        getLastBook(Object.values(books)) === selectedBook &&
        (getLastChapter(books[selectedBook])?.index === selectedChapterIndex ||
            !getLastChapter(books[selectedBook]))
    ) {
        return {};
    } else if (
        // If last chapter in book, go to next chapter in the next book
        getLastChapter(books[selectedBook])?.index === selectedChapterIndex ||
        !getLastChapter(books[selectedBook])
    ) {
        const bookTitles = Object.keys(books);
        const bookIndex = bookTitles.indexOf(selectedBook);
        selectedBook = bookTitles[bookIndex + 1];
        selectedChapter = getFirstChapter(books[selectedBook])?.number;
        selectedChapterIndex = getFirstChapter(books[selectedBook])?.index;
    } else {
        // If chapter in middle of the book, go to next chapter
        const nextChapter = getChapterByIndexWithOffset(
            books,
            selectedBook,
            selectedChapter,
            +1
        );
        selectedChapter = nextChapter.number;
        selectedChapterIndex = nextChapter.index;
    }

    return {
        selectedBook,
        selectedChapter,
        selectedChapterIndex,
    };
};

// Function handles the action of moving to previous chapter
const hanldeBackTransition = ({
    books,
    selectedBook,
    selectedChapter,
    selectedChapterIndex,
}) => {
    // If first chapter in first book do nothing
    if (
        getFirstBook(Object.values(books)) === selectedBook &&
        (getFirstChapter(books[selectedBook])?.index === selectedChapterIndex ||
            !getFirstChapter(books[selectedBook]))
    ) {
        return {};
    } else if (
        // If first chapter in book, go to last chapter in the previous book
        getFirstChapter(books[selectedBook])?.index === selectedChapterIndex ||
        !getFirstChapter(books[selectedBook])
    ) {
        const bookTitles = Object.keys(books);
        const bookIndex = bookTitles.indexOf(selectedBook);

        selectedBook = bookTitles[bookIndex - 1];
        selectedChapter = getLastChapter(books[selectedBook])?.number;
        selectedChapterIndex = getLastChapter(books[selectedBook])?.index;
    } else {
        // If chapter in middle of the book, go to previous chapter
        const nextChapter = getChapterByIndexWithOffset(
            books,
            selectedBook,
            selectedChapter,
            -1
        );

        selectedChapter = nextChapter.number;
        selectedChapterIndex = nextChapter.index;
    }

    return {
        selectedBook,
        selectedChapter,
        selectedChapterIndex,
    };
};

const getFirstBook = (books) => {
    const firstBook = _.first(books);
    return firstBook ? firstBook.title : undefined;
};

const getLastBook = (books) => {
    const lastBook = _.last(books);
    return lastBook ? lastBook.title : undefined;
};

const getChapterByIndex = (books, selectedBook, selectedChapter) => {
    const chapterIndex = _.findIndex(books[selectedBook].chapters, {
        number: selectedChapter,
    });

    if (chapterIndex < 0) {
        return null;
    }

    return books[selectedBook].chapters[chapterIndex];
};

const getChapterByIndexWithOffset = (
    books,
    selectedBook,
    selectedChapter,
    offset = 0
) => {
    return getChapterByIndex(books, selectedBook, selectedChapter + offset);
};

const getFirstChapter = (book) => {
    if (!book) return null;
    return _.first(book.chapters) || null;
};

const getLastChapter = (book) => {
    if (!book) return null;
    return _.last(book.chapters) || null;
};

const BookReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case BACK_CHAPTER:
            return {
                ...state,
                ...hanldeBackTransition(state),
            };
        case NEXT_CHAPTER:
            return {
                ...state,
                ...hanldeNextTransition(state),
            };
        case BOOK_SELECTED:
            const chapter = getFirstChapter(state.books[action.book]);

            return {
                ...state,
                selectedBook: action.book,
                selectedChapter: chapter?.number,
                selectedChapterIndex: chapter?.index,
            };

        case CHAPTER_SELECTED:
            const selectedChapter = getChapterByIndex(
                state.books,
                state.selectedBook,
                action.index
            );

            return {
                ...state,
                selectedChapter: selectedChapter?.number,
                selectedChapterIndex: selectedChapter?.index,
            };

        case BOOKS_LOADED:
            const bookModels = [];
            if (_.isArray(action.books)) {
                bookModels.push.apply(
                    bookModels,
                    action.books.map((book) => Book.ConstructFromObject(book))
                );
            }

            const firstBook = getFirstBook(bookModels);
            const bookMapping = rawBookHandler(bookModels);
            const firstChapter = getFirstChapter(bookMapping[firstBook]);

            return {
                ...state,
                books: bookMapping,
                selectedBook: firstBook,
                selectedChapter: firstChapter?.number,
                selectedChapterIndex: firstChapter?.index,
            };
        default:
            return state;
    }
};

export default BookReducer;
