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
    summary: {
        type: Object,
        default: "",
    },
    index: {
        type: String,
    },
});

// TODO: Check why this is not triggered
ChapterSchema.pre("save", function (next) {
    const book = this.parent();
    this.index = `${zeroPad(book.seriesIndex, 2)}${zeroPad(this.number, 3)}`;
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
    enabled: {
        type: Boolean,
        default: true,
    },
    chapters: {
        type: [ChapterSchema],
        default: [],
    },
});

// Series and SeriesIndex need to be unique
BookSchema.index({ series: 1, seriesIndex: 1 }, { unique: true });

const Book = model("Book", BookSchema);
const Chapter = model("Chapter", ChapterSchema);

export { Book, Chapter };
