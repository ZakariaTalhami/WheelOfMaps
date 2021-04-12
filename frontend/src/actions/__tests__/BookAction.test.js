import {
    nextChapter,
    previousChapter,
    setSelectedBook,
    setSelectedChapter,
} from "../BookActions";
import {
    BACK_CHAPTER,
    BOOK_SELECTED,
    CHAPTER_SELECTED,
    NEXT_CHAPTER,
} from "../types";

test("nextChapter action returns proper action type", () => {
    expect(nextChapter()).toStrictEqual({
        type: NEXT_CHAPTER,
    });
});

test("previousChapter action returns proper action type", () => {
    expect(previousChapter()).toStrictEqual({
        type: BACK_CHAPTER,
    });
});

test("setSelectedBook returns BOOK_SELECTED type and passed book", () => {
    const expectedBookTitle = "BookTitle";
    expect(setSelectedBook(expectedBookTitle)).toStrictEqual({
        type: BOOK_SELECTED,
        book: expectedBookTitle,
    });
});

test("setSelectedChapter returns CHAPTER_SELECTED type and passed chapter number", () => {
    const expectedChapterNumber = 25;
    expect(setSelectedChapter(expectedChapterNumber)).toStrictEqual({
        type: CHAPTER_SELECTED,
        index: expectedChapterNumber,
    });
});
