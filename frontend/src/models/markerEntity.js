import React from "react";
import baseEntity from "./baseEntity";
import Marker from "./marker";

// TODO: add documentation
export default class MarkerEntity extends baseEntity {
    marker;

    constructor(_id, markerObj) {
        super(_id);
        this.marker = Marker.ConstructFromObject(markerObj);
    }

    renderMarker() {
        const Marker = this.getMarkerComponent();
        return <Marker key={this._id} entity={this} />;
    }

    getMarkerComponent() {
        throw "getMarkerComponent() needs to be overriden in the child";
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
