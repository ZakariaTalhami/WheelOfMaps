import axios from "axios";
import { BOOK_SELECTED, CHAPTER_SELECTED, BOOKS_LOADED } from "./types";

export const setSelectedBook = (bookTitle) => ({
    type: BOOK_SELECTED,
    book: bookTitle,
});

export const setSelectedChapter = (chapterIndex) => ({
    type: CHAPTER_SELECTED,
    index: chapterIndex,
});

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
