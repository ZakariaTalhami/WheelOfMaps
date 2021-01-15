import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

const LocationMarker = (props) => {
    console.log(props.name);

    const locationIcon = L.icon({
        iconUrl: "http://localhost:8000" + props.marker.icon,
        iconSize: props.marker.size, // size of the icon
        iconAnchor: props.marker.anchor, // point of the icon which will correspond to marker's location
    });

    return <Marker position={props.position} icon={locationIcon}></Marker>;
};

export default LocationMarker;
