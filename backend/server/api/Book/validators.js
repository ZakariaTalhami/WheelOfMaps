import { celebrate, Joi } from "celebrate";

// Validation Middleware
const chapterValidationObj = Joi.object({
    // TODO: When the Prologue is handled this
    // should be a set with min of 1
    _id: Joi.string(),
    number: Joi.number().integer().required(),
    title: Joi.string().required(),
    summary: Joi.object({
        body: Joi.string().required(),
        author: Joi.string().required(),
        link: Joi.string().required(),
    }),
    // TODO: this shouldnt be set by the user
    index: Joi.string().required(),
});

export const chapterValidationMiddleware = celebrate({
    body: chapterValidationObj,
});

export const bookValidationMiddleware = celebrate({
    body: Joi.object({
        _id: Joi.string(),
        title: Joi.string().required(),
        series: Joi.string().required(),
        seriesIndex: Joi.number().integer().min(0).required(),
        author: Joi.string().required(),
        publishDate: Joi.date().required(),
        chapters: Joi.array().items(chapterValidationObj),
    }),
});
