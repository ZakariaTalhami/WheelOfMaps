/*
    Uility module for common functionality for Books and chapters.
*/

import Book from "../models/book";

/**
 * Get the formated chapter title
 * @param {Chapter} chapter
 * @returns {String} chapter title
 */
export const getChapterTitle = (chapter) => {
    let chapterTitle;

    if (chapter) {
        const prefix =
            chapter.number === 0 ? "Prologue" : `Chapter ${chapter.number}`;
        chapterTitle = `${prefix}: ${chapter.title}`;
    }

    return chapterTitle;
};

export const getBookChapterTitles = (book) => {
    const chapters = book.chapters || [];
    return chapters.map(getChapterTitle);
};

/**
 * Check if the provided chapter is in the chapter range
 *
 * @param {String} chapter - chapter index to be checked
 * @param {String} range - chpater index range
 * @returns {Boolean} is in range
 */
export const isInChapterRange = (chapter, range) => {
    let inRange = false;
    const points = range.split("-").map((token) => parseInt(token));
    chapter = parseInt(chapter);

    if (points.length === 2) {
        return points[0] <= chapter && chapter <= points[1];
    } else if (points.length === 1) {
        return points[0] === chapter;
    }
    return inRange;
};

export const createEmptyWoTBook = () => {
    return Book.ConstructFromObject({
        series: "Wheel of time",
        author: "Robort Jordan",
    });
};
