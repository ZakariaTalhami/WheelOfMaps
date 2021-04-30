import Chapter from "../chapter";

export const MOCK_BOOK_ID = "<bookID>";
export const MOCK_CHAPTER = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    number: 1,
    title: "title",
    summary: {
        body: "summary",
        link: "link/to/summary",
        author: "author of summary",
    },
    chapterIndex: "10101",
};

export default Chapter.ConstructFromObject(MOCK_BOOK_ID, MOCK_CHAPTER);
