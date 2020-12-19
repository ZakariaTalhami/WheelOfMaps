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

export const AddDescription = async (req, res) => {
    const locationId = req.params.locationId;
    const descriptionDto = req.body;
    try {
        const location = await Location.addDescription(
            locationId,
            descriptionDto
        );
        res.json(location);
    } catch (error) {
        res.status(500);
        res.json({
            message: "Failed to create description",
            error,
        });
    }
};
