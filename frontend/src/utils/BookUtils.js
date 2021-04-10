/*
    Uility module for common functionality for Books and chapters.
*/

export const getBookChapterTitles = (book) => {
    const chapters = book.chapters || [];
    return chapters.map((chapter) => {
        const prefix =
            chapter.number === 0 ? "Prologue" : `Chapter ${chapter.number}`;

        return `${prefix}: ${chapter.title}`;
    });
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
