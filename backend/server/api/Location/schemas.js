import { Schema, model } from "mongoose";
import { CHAPTER_RANGE_SCHEMA } from "../../utils/Constants";

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: [Number],
        required: true,
        minlength: 2,
        maxlength: 2,
    },
    description: [
        new Schema({
            chapterRange: CHAPTER_RANGE_SCHEMA,
            description: {
                type: String,
                required: true,
            },
        }),
    ],
});

export const Location = model("Location", LocationSchema);