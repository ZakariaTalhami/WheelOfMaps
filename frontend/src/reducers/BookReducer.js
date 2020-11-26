import { BOOK_SELECTED, CHAPTER_SELECTED } from "../actions/types";

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
  selectedBook: "Eye of the world",
  selectedChapter: 1,
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

    default:
      return state;
  }
};

export default BookReducer;
