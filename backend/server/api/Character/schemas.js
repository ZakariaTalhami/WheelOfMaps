import { Schema, model } from "mongoose";
import { CHAPTER_RANGE_SCHEMA } from "../../utils/Constants";

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: [
        new Schema({
            chapterRange: CHAPTER_RANGE_SCHEMA,
            position: {
                type: [Number],
                required: true,
                minlength: 2,
                maxlength: 2,
            },
        }),
    ],
    chapterSummary: {
        type: Map,
        of: String,
        required: true,
    },
    origin: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: false,
    },
});

CharacterSchema.statics.addPosition = function (characterId, position) {
    return this.findOneAndUpdate(
        { _id: characterId },
        { $push: { position: position } },
        { new: true }
    );
};

export const Character = model("Character", CharacterSchema);
