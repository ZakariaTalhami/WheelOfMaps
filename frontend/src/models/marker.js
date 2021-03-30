export default class Marker {
    icon;
    size;
    anchor;
    rotation;

    constructor(icon, size, anchor, rotation) {
        this.icon = icon;
        this.size = size;
        this.anchor = anchor;
        this.rotation = rotation;
    }

    static ConstructFromObject({ icon, size, anchor, rotation }) {
        return new Marker(icon, size, anchor, rotation);
    }
}
