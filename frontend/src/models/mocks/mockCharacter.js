import Character from "../character";
import { MOCK_MARKER } from "./mockMarker";

const MOCK_CHARACTER = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    name: "The fool in a hat",
    position: [
        {
            chapterRange: "01005-01010",
            position: [1, 5],
        },
    ],
    chapterSummary: {
        "01001": "summary",
    },
    marker: MOCK_MARKER,
};

export default Character.ConstructFromObject(MOCK_CHARACTER);
