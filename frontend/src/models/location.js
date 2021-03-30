import MarkerEntity from "./markerEntity";

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

    static ConstructFromObject({
        locationId,
        name,
        position,
        description,
        marker,
    }) {
        return new Location(locationId, name, position, description, marker);
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

    randomFunction(x, y) {
        if (x > 9) {
            const c = x * y;
            if (c > 200) {
                x = c * 8;
            }
        } else {
            const c = x + y;
        }
    }

    getUrl() {
        return `location`;
    }
}
