import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MarkerGenerator from "./MarkerGenerator";

const PADDING = 10;
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const Map = () => {
    const getMapTileLocation = () => {
        return `http://${BACKEND_HOST}:${BACKEND_PORT}/tiles/{z}/{y}/{x}.jpg`;
    };

    return (
        <MapContainer
            style={{ width: "100vw", height: "100vh" }}
            center={[4, 19]}
            zoom={3}
            minZoom={3}
            maxZoom={6}
            zoomControl={false}
            attributionControl={false}
            maxBounds={[
                [-10 - PADDING, -180 - PADDING],
                [85 + PADDING, 157 + PADDING],
            ]}
        >
            <TileLayer
                url={getMapTileLocation()}
                noWrap={true}
                bounds={[
                    [-10, -180],
                    [85, 157],
                ]}
            />
            <MapEvents />
            <MarkerGenerator />
        </MapContainer>
    );
};

function MapEvents() {
    const map = useMapEvents({
        click: (e) => {
            console.log(
                `${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`
            );
        },
    });
    return null;
}

export default Map;
