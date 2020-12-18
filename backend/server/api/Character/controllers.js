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
