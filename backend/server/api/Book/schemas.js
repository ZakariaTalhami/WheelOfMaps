import { Schema, model } from "mongoose";

const ChapterSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
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
  number: {
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
