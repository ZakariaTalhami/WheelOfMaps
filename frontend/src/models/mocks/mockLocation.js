import Location from "../location";
import { MOCK_MARKER } from "./mockMarker";

const MOCk_LOCATION = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    name: "magic city",
    position: [0, 0],
    description: [
        {
            chapterRange: "01005-01010",
        },
    ],
    marker: MOCK_MARKER,
};

export default Location.ConstructFromObject(MOCk_LOCATION);
