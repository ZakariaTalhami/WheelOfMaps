import baseEntity from "./baseEntity";
import { CHAPTER_ENTITY } from "./entityTypes";

export default class Chapter extends baseEntity {
    #bookId;
    number;
    title;
    summary;
    index;

    entityType = CHAPTER_ENTITY;

    constructor(bookId, chapterId, number, title, summary = {}, chapterIndex) {
        super(chapterId);
        this.#bookId = bookId;
        this.number = number;
        this.title = title;
        this.summary = summary;
        this.index = chapterIndex;
    }

    static ConstructFromObject(bookId, chapterObj) {
        return new Chapter(
            bookId,
            chapterObj._id,
            chapterObj.number,
            chapterObj.title,
            // TODO: Create a model for summary
            chapterObj.summary,
            chapterObj.chapterIndex || chapterObj.index
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

    setSummaryBody(summary) {
        this.summary.body = summary;
        this.setDirty();
    }

    setSummaryAuthor(author) {
        this.summary.author = author;
        this.setDirty();
    }
    setSummaryLink(link) {
        this.summary.link = link;
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
