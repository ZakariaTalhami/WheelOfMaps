import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { CHAPTER_IDNEX_RANGE_REGEX } from "../../utils/Constants";
import {
    CreateLocation,
    DeleteLocation,
    FetchLocation,
    ListLocation,
    UpdateLocation,
} from "./controllers";
import { skipMethod } from "../../utils/MiddlewareUtils";

// Create the express Router
const router = Router();

// Validation Middleware
const locationValidationMiddleware = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        position: Joi.array().items(Joi.number()).length(2).required(),
        description: Joi.array().items(
            Joi.object({
                chapterRange: Joi.string().pattern(CHAPTER_IDNEX_RANGE_REGEX),
                description: Joi.string().required(),
            })
        ),
    }),
});

// Routes

/*
 *   Location CRUD operations
 */
router
    .route("/")
    .all(locationValidationMiddleware)
    .get(ListLocation)
    .post(CreateLocation);
router
    .route("/:locationId")
    .all(skipMethod(locationValidationMiddleware, ["DELETE"]))
    .get(FetchLocation)
    .put(UpdateLocation)
    .delete(DeleteLocation);

export default router;
