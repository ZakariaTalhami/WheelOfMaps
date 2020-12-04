import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      style={{ width: "100vw", height: "100vh" }}
      center={[4, 19]}
      zoom={7}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        // TODO: replace with wheel of time map
        url="https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
