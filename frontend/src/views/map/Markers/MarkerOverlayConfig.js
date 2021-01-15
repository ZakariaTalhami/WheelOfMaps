import LocationMarker from "./LocationMarker";

const MarkerOverlayConfig = {
    Locations: {
        state: "Locations.locations",
        component: LocationMarker,
        defaultMarker: "",
    },
};

export default Object.freeze(MarkerOverlayConfig);
