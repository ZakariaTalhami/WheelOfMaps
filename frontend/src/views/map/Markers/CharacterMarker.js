import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { BACKEND_BASE_URL } from "../../../API/apiUtils";
import { useSelector } from "react-redux";

const CharacterMarker = ({ entity }) => {
    const chapterIndex = useSelector(
        (state) => state.Books.selectedChapterIndex
    );

    const characterIcon = L.icon({
        iconUrl: BACKEND_BASE_URL + entity.marker.icon,
        iconSize: entity.marker.size, // size of the icon
        iconAnchor: entity.marker.anchor, // point of the icon which will correspond to marker's location
    });

    const position = entity.getPosition(chapterIndex);

    if (!position) {
        return null;
    }

    return (
        <Marker
            position={entity.getPosition(chapterIndex)}
            icon={characterIcon}
        >
            <Tooltip offset={[entity.marker.anchor[0] + 5, 0]}>
                {entity.name}
            </Tooltip>
        </Marker>
    );
};

export default CharacterMarker;
