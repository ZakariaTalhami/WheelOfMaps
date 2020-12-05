import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const PADDING = 10;

const Map = () => {
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
        url="http://localhost:8000/tiles/{z}/{y}/{x}.jpg"
        noWrap={true}
        bounds={[
          [-10, -180],
          [85, 157],
        ]}
      />
      <MapEvents />
    </MapContainer>
  );
};

function MapEvents() {
  const map = useMapEvents({
    click: (e) => {
      console.log(e);
    },
    mousemove: (e) => {
      console.log(e.latlng.lat.toFixed(2), e.latlng.lng.toFixed(2));
    },
  });
  return null;
}

export default Map;
