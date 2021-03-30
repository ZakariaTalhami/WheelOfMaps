import MarkerEntity from "../markerEntity";

const MOCK_ENTITY_ID = "be7983c1-00db-4b1d-aef7-0dfc5946f8e3";
const MOCK_MARKER = {
    icon: "path/to/icon",
    size: [32, 32],
    anchor: [16, 16],
    rotation: 0,
};

let markerEntity;
beforeEach(() => {
    markerEntity = new MarkerEntity(MOCK_ENTITY_ID, MOCK_MARKER);
});

test("Initialization creates marker instance", () => {
    expect(markerEntity.marker).toBeDefined();
    expect(markerEntity.marker.constructor.name).toEqual("Marker");

    expect(markerEntity.marker.size).toEqual(MOCK_MARKER.size);
    expect(markerEntity.marker.icon).toEqual(MOCK_MARKER.icon);
    expect(markerEntity.marker.anchor).toEqual(MOCK_MARKER.anchor);
    expect(markerEntity.marker.rotation).toEqual(MOCK_MARKER.rotation);
});

test("setMarkerIcon", () => {
    expect(markerEntity.isDirty()).toEqual(false);

    markerEntity.setMarkerIcon("new/path/to/icon");

    expect(markerEntity.marker.icon).toEqual("new/path/to/icon");
    expect(markerEntity.isDirty()).toEqual(true);
});

test("setSize", () => {
    expect(markerEntity.isDirty()).toEqual(false);

    markerEntity.setSize([64, 64]);

    expect(markerEntity.marker.size).toEqual([64, 64]);
    expect(markerEntity.isDirty()).toEqual(true);
});

test("setAnchor", () => {
    expect(markerEntity.isDirty()).toEqual(false);

    markerEntity.setAnchor([0, 0]);

    expect(markerEntity.marker.anchor).toEqual([0, 0]);
    expect(markerEntity.isDirty()).toEqual(true);
});

test("setRotation", () => {
    expect(markerEntity.isDirty()).toEqual(false);

    markerEntity.setRotation(90);

    expect(markerEntity.marker.rotation).toEqual(90);
    expect(markerEntity.isDirty()).toEqual(true);
});
