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
