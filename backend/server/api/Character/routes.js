import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
    CHAPTER_IDNEX_RANGE_REGEX,
    CHAPTER_IDNEX_REGEX,
} from "../../utils/Constants";
import {
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
const characterValidationMiddleware = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        position: Joi.array().items(
            Joi.object({
                chapterRange: Joi.string().pattern(CHAPTER_IDNEX_RANGE_REGEX),
                position: Joi.array().items(Joi.number()).length(2).required(),
            })
        ),
        chapterSummary: Joi.object().pattern(CHAPTER_IDNEX_REGEX, Joi.string()),
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

export default router;
