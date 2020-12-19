import {
    createModelAPIHandler,
    deleteModelAPIHandler,
    fetchModelAPIHandler,
    listModelAPIHandler,
    updateModelAPIHandler,
} from "../../utils/GenericAPIHandlers";
import { Character } from "./schemas";

export const ListCharacter = listModelAPIHandler(Character);
export const CreateCharacter = createModelAPIHandler(Character);
export const FetchCharacter = fetchModelAPIHandler(Character, "characterId");
export const UpdateCharacter = updateModelAPIHandler(Character, "characterId");
export const DeleteCharacter = deleteModelAPIHandler(Character, "characterId");

export const AddPosition = async (req, res) => {
    const characterId = req.params.characterId;
    const positionDto = req.body;
    try {
        const character = await Character.addPosition(characterId, positionDto);
        res.json(character);
    } catch (error) {
        res.status(500);
        res.json({
            message: "Failed to add position to " + characterId + " character",
            error,
        });
    }
};
