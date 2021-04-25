import React from "react";
import { Tooltip } from "react-leaflet";
import L from "leaflet";
import { BACKEND_BASE_URL } from "../../../API/apiUtils";
import EntityMarker from "./EntityMarker";

const LocationMarker = ({ entity, ...props }) => {
    const locationIcon = L.icon({
        iconUrl: BACKEND_BASE_URL + entity.marker.icon,
        iconSize: entity.marker.size, // size of the icon
        iconAnchor: entity.marker.anchor, // point of the icon which will correspond to marker's location
    });

    return (
        <EntityMarker
            entity={entity}
            position={entity.position}
            icon={locationIcon}
            {...props}
        >
            <Tooltip offset={[entity.marker.anchor[0] + 5, 0]}>
                {entity.name}
            </Tooltip>
        </EntityMarker>
    );
};

export default LocationMarker;
