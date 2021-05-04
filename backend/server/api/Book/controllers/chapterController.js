import BookService from "../bookService";
import ChapterService from "../chapterService";
import GenericCRUDController from "../../GenericCRUDController";
import { BOOK_ID_LOOKUP } from "../controllers/bookController";

export const CHAPTER_ID_LOOKUP = "chapterID";

export class ChapterController extends GenericCRUDController {
    constructor(bookService, chapterService, bookLockupKey, chapterLookUpKey) {
        super(chapterService, chapterLookUpKey);
        this.book = bookService;
        this.bookLookup = bookLockupKey;
    }

    async create(req, res) {
        const bookId = req.params[this.bookLookup];
        const chapterDTO = req.body;
        try {
            const entityObj = await this.book.addChapter(bookId, chapterDTO);
            res.json(entityObj);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                message: "Failed to create chapter",
                error,
            });
        }
    }

    async update(req, res) {
        const bookId = req.params[this.bookLookup];
        const chapterId = req.params[this.lookUpKey];
        const chapterDTO = req.body;
        try {
            const entityObj = await this.entity.update(
                bookId,
                chapterId,
                chapterDTO
            );
            res.json(entityObj);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                message: "Failed to update " + this.entity.modelName,
                error,
            });
        }
    }

    async delete(req, res) {
        const bookId = req.params[this.bookLookup];
        const chapterId = req.params[this.lookUpKey];
        try {
            await this.entity.delete(bookId, chapterId);
            res.status(204);
            res.json("success");
        } catch (error) {
            console.log(error);
            res.status(404);
            res.json({
                message:
                    "Failed to find " +
                    this.entity.modelName +
                    " of " +
                    entityId,
                error,
            });
        }
    }
}

export default new ChapterController(
    BookService,
    ChapterService,
    BOOK_ID_LOOKUP,
    CHAPTER_ID_LOOKUP
);
