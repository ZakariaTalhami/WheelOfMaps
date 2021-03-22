import Chapter from "../chapter";

const MOCK_BOOK_ID = "<bookID>";
const MOCK_CHAPTER = {
    number: 1,
    title: "title",
    summary: "summary",
    chapterIndex: "10101",
};

let chapter;
beforeEach(() => {
    chapter = Chapter.ConstructFromObject(MOCK_BOOK_ID, MOCK_CHAPTER);
});

test("constructor with passed arguments", () => {
    let chapter = new Chapter(
        "bookId",
        23,
        "chapterTitle",
        "chapterSummary",
        "chapterIndex"
    );

    expect(chapter.getBookId()).toEqual("bookId");
    expect(chapter.number).toEqual(23);
    expect(chapter.title).toEqual("chapterTitle");
    expect(chapter.summary).toEqual("chapterSummary");
    expect(chapter.index).toEqual("chapterIndex");
});

test("constructor with passed chapter object", () => {
    expect(chapter.getBookId()).toEqual(MOCK_BOOK_ID);
    expect(chapter.number).toEqual(MOCK_CHAPTER.number);
    expect(chapter.title).toEqual(MOCK_CHAPTER.title);
    expect(chapter.summary).toEqual(MOCK_CHAPTER.summary);
    expect(chapter.index).toEqual(MOCK_CHAPTER.chapterIndex);
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

test("setSummary", () => {
    chapter.setSummary("newSummary");

    expect(chapter.summary).toEqual("newSummary");
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
