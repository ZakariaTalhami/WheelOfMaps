import MarkerEntity from "./markerEntity";
import LocationMarker from "../views/map/Markers/LocationMarker";
import { isInChapterRange } from "../utils/BookUtils";
import _ from "lodash";

export default class Location extends MarkerEntity {
    name;
    position;
    description;

    constructor(locationId, name, position, description, marker) {
        super(locationId, marker);
        this.name = name;
        this.position = position;
        this.description = description;
    }

    static ConstructFromObject({ _id, name, position, description, marker }) {
        return new Location(_id, name, position, description, marker);
    }

    setName(name) {
        this.name = name;
        this.setDirty();
    }

    setPosition(position) {
        this.position = position;
        this.setDirty();
    }

    // How to handle description
    setDescription(description) {
        this.description = description;
        this.setDirty();
    }

    getDescription(chapterIndex) {
        for (const descriptionItem of this.description) {
            if (isInChapterRange(chapterIndex, descriptionItem.chapterRange)) {
                return descriptionItem;
            }
        }

        return null;
    }

    getUrl() {
        return `location`;
    }

    getMarkerComponent() {
        return LocationMarker;
    }

    isInChapter(chapterIndex) {
        return _.isObject(this.getDescription(chapterIndex));
    }
}
