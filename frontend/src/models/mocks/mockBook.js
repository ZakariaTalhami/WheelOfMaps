import Book from "../book";

const MOCK_BOOK = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    title: "bookTile",
    series: "seriesTitle",
    seriesIndex: "seriesIndex",
    author: "bookAuthor",
    publishDate: "BookPublishDate",
    chapters: [],
};

export default Book.ConstructFromObject(MOCK_BOOK);
