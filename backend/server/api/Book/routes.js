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

// Create the express Router
const router = Router();

// Validation Middlewar
const chapterValidationObj = Joi.object({
  number: Joi.number().integer().min(1).required(),
  title: Joi.string().required(),
});

const chapterValidationMiddleware = celebrate({
  body: chapterValidationObj,
});

const bookValidationMiddleware = celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    series: Joi.string().required(),
    number: Joi.number().integer().min(0).required(),
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
  .all(bookValidationMiddleware)
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
