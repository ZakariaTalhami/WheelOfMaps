import { Router } from "express";
// Controllers
import BookController, { CreateChapter } from "./controllers";
// Middleware
import { skipMethod } from "../../utils/MiddlewareUtils";
import {
    bookValidationMiddleware,
    chapterValidationMiddleware,
} from "./validators";

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
    .route("/:bookID/chapter")
    .all(chapterValidationMiddleware)
    .post(CreateChapter);

export default router;
