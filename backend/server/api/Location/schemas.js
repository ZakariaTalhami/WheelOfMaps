import { Schema, model } from "mongoose";
import { CHAPTER_RANGE_SCHEMA } from "../../utils/Constants";
import MarkerModel from "../common/MarkerModel";

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

LocationSchema.plugin(MarkerModel);

LocationSchema.statics.addDescription = function (locationId, description) {
    return this.findOneAndUpdate(
        { _id: locationId },
        { $push: { description: description } },
        { new: true }
    );
};

export const Location = model("Location", LocationSchema);
