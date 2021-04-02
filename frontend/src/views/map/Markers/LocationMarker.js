import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { BACKEND_BASE_URL } from "../../../API/apiUtils";

const LocationMarker = ({ entity }) => {
    console.log(entity.name);

    const locationIcon = L.icon({
        iconUrl: BACKEND_BASE_URL + entity.marker.icon,
        iconSize: entity.marker.size, // size of the icon
        iconAnchor: entity.marker.anchor, // point of the icon which will correspond to marker's location
    });

    console.log(locationIcon);
    return (
        <Marker position={entity.position} icon={locationIcon}>
            <Tooltip offset={[entity.marker.anchor[0] + 5, 0]}>
                {entity.name}
            </Tooltip>
        </Marker>
    );
};

export default LocationMarker;
