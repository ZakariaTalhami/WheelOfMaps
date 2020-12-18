import { Schema, model } from "mongoose";
import { zeroPad } from "../../utils/NumberUtils";

const ChapterSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
    },
    chapterIndex: {
        type: String,
    },
});

ChapterSchema.pre("save", function (next) {
    const book = this.parent();
    this.chapterIndex = `${zeroPad(book.seriesIndex, 2)}${zeroPad(
        this.number,
        3
    )}`;
    next();
});

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    series: {
        type: String,
        required: true,
    },
    seriesIndex: {
        // TODO: Make only int
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
        required: true,
    },
    chapters: {
        type: [ChapterSchema],
        default: [],
    },
});

// Series and SeriesIndex need to be unique
BookSchema.index({ series: 1, seriesIndex: 1 }, { unique: true });

BookSchema.statics.AddChapter = function (bookId, chapter) {
    return this.findOneAndUpdate(
        { _id: bookId },
        { $push: { chapters: chapter } },
        { new: true }
    );
};

const Book = model("Book", BookSchema);
const Chapter = model("Chapter", ChapterSchema);

export { Book, Chapter };