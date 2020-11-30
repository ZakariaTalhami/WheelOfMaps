import { BOOK_SELECTED, CHAPTER_SELECTED } from "./types";

export const setSelectedBook = (bookTitle) => ({
  type: BOOK_SELECTED,
  book: bookTitle,
});

export const setSelectedChapter = (chapterName, chapterIndex) => ({
  type: CHAPTER_SELECTED,
  chapter: chapterName,
  index: chapterIndex,
});
