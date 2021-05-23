import BookService from "../bookService";
import GenericCRUDController from "../../GenericCRUDController";

export const BOOK_ID_LOOKUP = "bookID";

export class BookController extends GenericCRUDController {}

export default new BookController(BookService, BOOK_ID_LOOKUP);
