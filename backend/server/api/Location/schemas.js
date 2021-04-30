import { Schema, model } from "mongoose";
import { CHAPTER_RANGE_SCHEMA } from "../../utils/Constants";
import CreditModel from "../common/CreditModel";
import MarkerModel from "../common/MarkerModel";

/**
 * Location Description Schema
 */
const LocationDescriptionSchema = new Schema({
    chapterRange: CHAPTER_RANGE_SCHEMA,
    description: {
        type: String,
        required: true,
    },
});

LocationDescriptionSchema.plugin(CreditModel);

/**
 * Location Schema
 */
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
    description: [LocationDescriptionSchema],
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
