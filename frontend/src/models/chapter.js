import baseEntity from "./baseEntity";
import { CHAPTER_ENTITY } from "./entityTypes";

export default class Chapter extends baseEntity {
    #bookId;
    number;
    title;
    summary;
    index;

    entityType = CHAPTER_ENTITY;

    constructor(bookId, chapterId, number, title, summary, chapterIndex) {
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
