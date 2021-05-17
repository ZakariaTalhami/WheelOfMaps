import Chapter from "../chapter";
import { MOCK_BOOK_ID, MOCK_CHAPTER } from "../mocks/mockChapter";

let chapter;
beforeEach(() => {
    chapter = Chapter.ConstructFromObject(MOCK_BOOK_ID, MOCK_CHAPTER);
});

test("constructor with passed arguments", () => {
    const chapterSummary = {
        body: "summary",
        link: "link/to/summary",
        author: "author of summary",
    };

    let chapter = new Chapter(
        "bookId",
        "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
        23,
        "chapterTitle",
        chapterSummary,
        "chapterIndex"
    );

    expect(chapter.getBookId()).toEqual("bookId");
    expect(chapter.number).toEqual(23);
    expect(chapter.title).toEqual("chapterTitle");
    // Chapter Summary
    expect(chapter.summary.body).toEqual(chapterSummary.body);
    expect(chapter.summary.link).toEqual(chapterSummary.link);
    expect(chapter.summary.author).toEqual(chapterSummary.author);

    expect(chapter.index).toEqual("chapterIndex");
});

test("constructor with passed chapter object", () => {
    expect(chapter.getBookId()).toEqual(MOCK_BOOK_ID);
    expect(chapter.number).toEqual(MOCK_CHAPTER.number);
    expect(chapter.title).toEqual(MOCK_CHAPTER.title);
    expect(chapter.index).toEqual(MOCK_CHAPTER.chapterIndex);
});

test("getBookId", () => {
    expect(chapter.getBookId()).toEqual(MOCK_BOOK_ID);
});

test("setNumber", () => {
    chapter.setNumber(5);

    expect(chapter.number).toEqual(5);
    expect(chapter.isDirty()).toEqual(true);
});

test("setTitle", () => {
    chapter.setTitle("newTitle");

    expect(chapter.title).toEqual("newTitle");
    expect(chapter.isDirty()).toEqual(true);
});

test("setSummaryBody", () => {
    chapter.setSummaryBody("newSummary");

    expect(chapter.summary.body).toEqual("newSummary");
    expect(chapter.isDirty()).toEqual(true);
});

test("setSummaryLink", () => {
    chapter.setSummaryLink("newSummaryLink");

    expect(chapter.summary.link).toEqual("newSummaryLink");
    expect(chapter.isDirty()).toEqual(true);
});

test("setSummaryAuthor", () => {
    chapter.setSummaryAuthor("newSummaryAuthor");

    expect(chapter.summary.author).toEqual("newSummaryAuthor");
    expect(chapter.isDirty()).toEqual(true);
});

test("setIndex", () => {
    chapter.setIndex("50505");

    expect(chapter.index).toEqual("50505");
    expect(chapter.isDirty()).toEqual(true);
});

test("getUrl", () => {
    expect(chapter.getUrl()).toEqual(`book/${MOCK_BOOK_ID}/chapter`);
});
