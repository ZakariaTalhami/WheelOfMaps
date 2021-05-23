import { Router } from "express";
// Controllers
import BookController, { CreateChapter } from "./controllers/bookController";
// Middleware
import { skipMethod } from "../../utils/MiddlewareUtils";
import {
    bookValidationMiddleware,
    chapterValidationMiddleware,
} from "./validators";
import ChapterController from "./controllers/chapterController";

// Create the express Router
const router = Router();

/*
 *   Book CRUD operations
 */
router
    .route("/")
    .all(bookValidationMiddleware)
    .post(BookController.create)
    .get(BookController.list);

router
    .route(`/:${BookController.lookUpKey}`)
    .all(skipMethod(bookValidationMiddleware, ["DELETE"]))
    .get(BookController.getById)
    .put(BookController.update)
    .delete(BookController.delete);

/*
 *   Book's Chapter CRUD operations
 */

router
    .route(`/:${ChapterController.bookLookup}/chapter`)
    .all(chapterValidationMiddleware)
    .post(ChapterController.create);

router
    .route(
        `/:${ChapterController.bookLookup}/chapter/:${ChapterController.lookUpKey}`
    )
    .all(skipMethod(chapterValidationMiddleware, ["DELETE"]))
    .put(ChapterController.update)
    .delete(ChapterController.delete);

export default router;
