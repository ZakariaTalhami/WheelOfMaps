import { Router } from "express";
import {
    CreateBook,
    CreateChapter,
    ListBook,
    FetchBook,
    DeleteBook,
    UpdateBook,
} from "./controllers";
import { celebrate, Joi } from "celebrate";
import { skipMethod } from "../../utils/MiddlewareUtils";

// Create the express Router
const router = Router();

// Validation Middleware
const chapterValidationObj = Joi.object({
    // TODO: When the Prologue is handled this
    // should be a set with min of 1
    number: Joi.number().integer().required(),
    title: Joi.string().required(),
    summary: Joi.string(),
    // TODO: this shouldnt be set by the user
    chapterIndex: Joi.string().required(),
});

const chapterValidationMiddleware = celebrate({
    body: chapterValidationObj,
});

const bookValidationMiddleware = celebrate({
    body: Joi.object({
        title: Joi.string().required(),
        series: Joi.string().required(),
        seriesIndex: Joi.number().integer().min(0).required(),
        author: Joi.string().required(),
        publishDate: Joi.date().required(),
        chapters: Joi.array().items(chapterValidationObj),
    }),
});

// Routes

/*
 *   Book CRUD operations
 */
router.route("/").all(bookValidationMiddleware).post(CreateBook).get(ListBook);
router
    .route("/:bookID")
    .all(skipMethod(bookValidationMiddleware, ["DELETE"]))
    .get(FetchBook)
    .put(UpdateBook)
    .delete(DeleteBook);

/*
 *   Book's Chapter CRUD operations
 */
router
    .route("/:bookID/chapter")
    .all(chapterValidationMiddleware)
    .post(CreateChapter);

export default router;
