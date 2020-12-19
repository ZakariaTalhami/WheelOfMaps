import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { CHAPTER_IDNEX_RANGE_REGEX } from "../../utils/Constants";
import {
    AddDescription,
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
const descriptionValidationObj = Joi.object({
    chapterRange: Joi.string().pattern(CHAPTER_IDNEX_RANGE_REGEX),
    description: Joi.string().required(),
});

const descriptionValidationMiddleware = celebrate({
    body: descriptionValidationObj,
});
const locationValidationMiddleware = celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        position: Joi.array().items(Joi.number()).length(2).required(),
        description: Joi.array().items(descriptionValidationObj),
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

router
    .route("/:locationId/description")
    .all(descriptionValidationMiddleware)
    .post(AddDescription);

export default router;
