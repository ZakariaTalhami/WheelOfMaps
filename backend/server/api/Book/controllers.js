import { Book, Chapter } from "./schemas";
import BookService from "./bookService";
import GenericCRUDController from "../GenericCRUDController";

export const BOOK_ID_LOOKUP = "bookID";

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

export class BookController extends GenericCRUDController {}

export default new BookController(BookService, BOOK_ID_LOOKUP);
