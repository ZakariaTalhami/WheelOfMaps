import { Joi } from "celebrate";
import { Schema } from "mongoose";

export const markerValidationObj = Joi.object({
    icon: Joi.string().required(),
    size: Joi.array().items(Joi.number()).length(2),
    anchor: Joi.array().items(Joi.number()).length(2),
});

function MarkerModel(schema, options) {
    const markerSchema = new Schema({
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: [Number],
            minlength: 2,
            maxlength: 2,
            default: [64, 64],
        },
        anchor: {
            type: [Number],
            minlength: 2,
            maxlength: 2,
            default: [0, 0],
        },
        rotation: {
            type: Number,
            default: 0,
        },
    });

    schema.add({
        marker: markerSchema,
    });
}

export default MarkerModel;
