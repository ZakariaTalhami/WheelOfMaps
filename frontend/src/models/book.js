import baseEntity from "./baseEntity";
import Chapter from "./chapter";
import { BOOK_ENTITY } from "./entityTypes";

export default class Book extends baseEntity {
    title;
    series;
    seriesIndex;
    author;
    publishDate;
    chapters;

    entityType = BOOK_ENTITY;

    constructor(
        bookId,
        title,
        series,
        seriesIndex,
        author,
        publishDate,
        chapters = []
    ) {
        super(bookId);
        this.title = title;
        this.series = series;
        this.seriesIndex = seriesIndex;
        this.author = author;
        this.publishDate = publishDate;
        this.chapters = chapters;
    }

    static ConstructFromObject(bookObj) {
        const chapters = [];
        if (bookObj.chapters) {
            bookObj.chapters.forEach((chapter) => {
                chapters.push(
                    Chapter.ConstructFromObject(bookObj._id, chapter)
                );
            });
        }

        return new Book(
            bookObj._id,
            bookObj.title,
            bookObj.series,
            bookObj.seriesIndex,
            bookObj.author,
            bookObj.publishDate,
            chapters
        );
    }

    getPublishDate() {
        let parsedDate = "";

        if (this.publishDate) {
            parsedDate = this.publishDate.split("T")[0];
        }

        return parsedDate;
    }

    setTitle(title) {
        this.title = title;
        this.setDirty();
    }

    setSeries(series) {
        this.series = series;
        this.setDirty();
    }

    setSeriesIndex(seriesIndex) {
        this.seriesIndex = seriesIndex;
        this.setDirty();
    }

    setAuthor(author) {
        this.author = author;
        this.setDirty();
    }

    setPublishDate(date) {
        this.publishDate = date;
        this.setDirty();
    }

    serialize() {
        const obj = super.serialize();
        obj.chapters = obj.chapters.map((chapter) => chapter.serialize());
        return obj;
    }

    getUrl() {
        return `book`;
    }
}
