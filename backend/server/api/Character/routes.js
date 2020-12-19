import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import {
    CHAPTER_IDNEX_RANGE_REGEX,
    CHAPTER_IDNEX_REGEX,
} from "../../utils/Constants";
import {
    AddChapterSummary,
    AddPosition,
    CreateCharacter,
    DeleteCharacter,
    FetchCharacter,
    ListCharacter,
    UpdateCharacter,
} from "./controllers";
import { skipMethod } from "../../utils/MiddlewareUtils";

// Create the express Router
const router = Router();

// Validation Middleware
const positionValidationObj = Joi.object({
    chapterRange: Joi.string().pattern(CHAPTER_IDNEX_RANGE_REGEX),
    position: Joi.array().items(Joi.number()).length(2).required(),
});

const positionValidationMiddleware = celebrate({ body: positionValidationObj });
const characterValidationMiddleware = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        position: Joi.array().items(positionValidationObj),
        chapterSummary: Joi.object().pattern(CHAPTER_IDNEX_REGEX, Joi.string()),
    }),
});
const chapterSummaryValidationMiddleware = celebrate({
    [Segments.BODY]: Joi.object({
        chapter: Joi.string().pattern(CHAPTER_IDNEX_REGEX).required(),
        summary: Joi.string().required(),
    }),
});

// Routes

/*
 *   Character CRUD operations
 */
router
    .route("/")
    .all(characterValidationMiddleware)
    .get(ListCharacter)
    .post(CreateCharacter);
router
    .route("/:characterId")
    .all(skipMethod(characterValidationMiddleware, ["DELETE"]))
    .get(FetchCharacter)
    .put(UpdateCharacter)
    .delete(DeleteCharacter);

router
    .route("/:characterId/position")
    .all(positionValidationMiddleware)
    .post(AddPosition);

router
    .route("/:characterId/chapter-summary")
    .all(chapterSummaryValidationMiddleware)
    .post(AddChapterSummary);

export default router;
