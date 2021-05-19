// Libs
import axios from "axios";
// Action types
import {
    BOOK_SELECTED,
    CHAPTER_SELECTED,
    BOOKS_LOADED,
    NEXT_CHAPTER,
    BACK_CHAPTER,
} from "./types";

export const nextChapter = () => ({ type: NEXT_CHAPTER });
export const previousChapter = () => ({ type: BACK_CHAPTER });

export const setSelectedBook = (bookTitle) => ({
    type: BOOK_SELECTED,
    book: bookTitle,
});

export const setSelectedChapter = (chapterIndex) => ({
    type: CHAPTER_SELECTED,
    index: chapterIndex,
});

// TODO: handle error responses
export const loadBooks = () => (dispatch) => {
    return axios
        .get("book")
        .then((res) => res.data)
        .then((data) => {
            dispatch({
                type: BOOKS_LOADED,
                books: data,
            });
        });
};

export const saveBook = (promise) => (dispatch) => {
    return promise
        .then((res) => res.data)
        .then(() => {
            alert("Changes saved successfully");
            dispatch(loadBooks());
        })
        .catch((err) => {
            console.error("Failed to save Book");
            alert("Failed to save changes");
            console.error(err);
        });
};
