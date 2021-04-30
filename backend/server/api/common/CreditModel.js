import { Joi } from "celebrate";
import { Schema } from "mongoose";

export const creditValidationObj = Joi.object({
    author: Joi.string().required(),
    link: Joi.string().required(),
});

function CreditModel(schema, options) {
    const creditSchema = new Schema({
        author: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
    });

    schema.add({
        credit: creditSchema,
    });
}

export default CreditModel;
