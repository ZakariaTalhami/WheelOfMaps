import Marker from "../marker";

export const MOCK_MARKER = {
    icon: "path/to/icon",
    size: [32, 32],
    anchor: [16, 16],
    rotation: 0,
};

export default Marker.ConstructFromObject(MOCK_MARKER);
