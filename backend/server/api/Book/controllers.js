import {
  createModelAPIHandler,
  deleteModelAPIHandler,
  fetchModelAPIHandler,
  listModelAPIHandler,
  updateModelAPIHandler,
} from "../../utils/GenericAPIHandlers";
import { Book, Chapter } from "./schemas";

export const ListBook = listModelAPIHandler(Book);
export const CreateBook = createModelAPIHandler(Book);
export const FetchBook = fetchModelAPIHandler(Book, "bookID");
export const UpdateBook = updateModelAPIHandler(Book, "bookID");
export const DeleteBook = deleteModelAPIHandler(Book, "bookID");

export const CreateChapter = async (req, res) => {
  const bookId = req.params.bookID;
  const chapterDto = req.body;
  try {
    const chapter = new Chapter(chapterDto);
    const book = await Book.AddChapter(bookId, chapter);
    res.json(book);
  } catch (error) {
    res.status(500);
    res.json({
      message: "Failed to create Chapter",
      error,
    });
  }
};
