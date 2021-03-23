import Book from "../book";
import Chapter from "../chapter";

const MOCK_BOOK_ID = "<bookID>";
const MOCK_CHAPTER = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    number: 1,
    title: "title",
    summary: "summary",
    chapterIndex: "10101",
};

const MOCK_BOOK = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    title: "bookTile",
    series: "seriesTitle",
    seriesIndex: "seriesIndex",
    author: "bookAuthor",
    publishDate: "BookPublishDate",
    chapters: [MOCK_CHAPTER, MOCK_CHAPTER],
};

let book;
beforeEach(() => {
    book = Book.ConstructFromObject(MOCK_BOOK);
});

test("constructor with passed arguments", () => {
    let book = new Book(
        "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
        "bookTile",
        "seriesTitle",
        "seriesIndex",
        "bookAuthor",
        "BookPublishDate",
        [new Chapter(MOCK_CHAPTER), new Chapter(MOCK_CHAPTER)]
    );

    expect(book.title).toEqual("bookTile");
    expect(book.series).toEqual("seriesTitle");
    expect(book.seriesIndex).toEqual("seriesIndex");
    expect(book.author).toEqual("bookAuthor");
    expect(book.publishDate).toEqual("BookPublishDate");
    expect(book.chapters.length).toEqual(2);
});

test("constructor with passed chapter object", () => {
    expect(book.title).toEqual(MOCK_BOOK.title);
    expect(book.series).toEqual(MOCK_BOOK.series);
    expect(book.seriesIndex).toEqual(MOCK_BOOK.seriesIndex);
    expect(book.author).toEqual(MOCK_BOOK.author);
    expect(book.publishDate).toEqual(MOCK_BOOK.publishDate);
    expect(book.chapters.length).toEqual(2);
});

test("ConstructFromObject empty array for chapters if undefiend", () => {
    let book = new Book(
        "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
        "bookTile",
        "seriesTitle",
        "seriesIndex",
        "bookAuthor",
        "BookPublishDate"
    );
    expect(book.chapters.length).toEqual(0);
});

test("setTitle", () => {
    book.setTitle("newTitle");

    expect(book.title).toEqual("newTitle");
    expect(book.isDirty()).toEqual(true);
});

test("setSeries", () => {
    book.setSeries("newSeries");

    expect(book.series).toEqual("newSeries");
    expect(book.isDirty()).toEqual(true);
});

test("setAuthor", () => {
    book.setAuthor("newAuthor");

    expect(book.author).toEqual("newAuthor");
    expect(book.isDirty()).toEqual(true);
});

test("setPublishDate", () => {
    book.setPublishDate("50505");

    expect(book.publishDate).toEqual("50505");
    expect(book.isDirty()).toEqual(true);
});

test("getUrl", () => {
    expect(book.getUrl()).toEqual(`book`);
});
