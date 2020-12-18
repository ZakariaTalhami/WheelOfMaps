import {
    createModelAPIHandler,
    deleteModelAPIHandler,
    fetchModelAPIHandler,
    listModelAPIHandler,
    updateModelAPIHandler,
} from "../../utils/GenericAPIHandlers";
import { Location } from "./schemas";

export const ListLocation = listModelAPIHandler(Location);
export const CreateLocation = createModelAPIHandler(Location);
export const FetchLocation = fetchModelAPIHandler(Location, "locationId");
export const UpdateLocation = updateModelAPIHandler(Location, "locationId");
export const DeleteLocation = deleteModelAPIHandler(Location, "locationId");
