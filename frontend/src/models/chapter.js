import baseEntity from "./baseEntity";

export default class Chapter extends baseEntity {
    #bookId;
    number;
    title;
    summary;
    index;

    constructor(bookId, number, title, summary, chapterIndex) {
        super();
        this.#bookId = bookId;
        this.number = number;
        this.title = title;
        this.summary = summary;
        this.index = chapterIndex;
    }

    static ConstructFromObject(bookId, chapterObj) {
        return new Chapter(
            bookId,
            chapterObj.number,
            chapterObj.title,
            chapterObj.summary,
            chapterObj.chapterIndex
        );
    }

    getBookId() {
        return this.#bookId;
    }

    setNumber(number) {
        this.number = number;
        this.setDirty();
    }

    setTitle(title) {
        this.title = title;
        this.setDirty();
    }

    setSummary(summary) {
        this.summary = summary;
        this.setDirty();
    }

    setIndex(index) {
        this.index = index;
        this.setDirty();
    }

    getUrl() {
        return `book/${this.#bookId}/chapter`;
    }
}
