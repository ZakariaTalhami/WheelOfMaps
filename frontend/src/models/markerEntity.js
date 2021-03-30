import baseEntity from "./baseEntity";
import Marker from "./marker";

export default class MarkerEntity extends baseEntity {
    marker;

    constructor(_id, markerObj) {
        super(_id);
        this.marker = Marker.ConstructFromObject(markerObj);
    }

    setMarkerIcon(iconUrl) {
        this.marker.icon = iconUrl;
        this.setDirty();
    }

    setSize(size) {
        this.marker.size = size;
        this.setDirty();
    }

    setAnchor(anchor) {
        this.marker.anchor = anchor;
        this.setDirty();
    }

    setRotation(rotation) {
        this.marker.rotation = rotation;
        this.setDirty();
    }
}
