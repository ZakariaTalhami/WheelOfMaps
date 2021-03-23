import baseEntity from "./baseEntity";
import Chapter from "./chapter";

export default class Book extends baseEntity {
    title;
    series;
    seriesIndex;
    author;
    publishDate;
    chapters;

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
                chapters.push(new Chapter(bookObj._id, chapter));
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

    getUrl() {
        return `book`;
    }
}
