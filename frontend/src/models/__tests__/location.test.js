import LocationMarker from "../../views/map/Markers/LocationMarker";
import Location from "../location";

const MOCK_MARKER = {
    icon: "path/to/icon",
    size: [32, 32],
    anchor: [16, 16],
    rotation: 0,
};

const MOCk_LOCATION = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    name: "magic city",
    position: [0, 0],
    description: {},
    marker: MOCK_MARKER,
};

let location = Location.ConstructFromObject(MOCk_LOCATION);
beforeEach(() => {
    location = Location.ConstructFromObject(MOCk_LOCATION);
});

test("initialization", () => {
    expect(location.marker).toBeDefined();
    expect(location.name).toEqual(MOCk_LOCATION.name);
    expect(location.position).toEqual(MOCk_LOCATION.position);
    expect(location.description).toEqual(MOCk_LOCATION.description);
});

test("setName", () => {
    expect(location.isDirty()).toEqual(false);

    location.setName("new name");

    expect(location.name).toEqual("new name");
    expect(location.isDirty()).toEqual(true);
});

test("setPosition", () => {
    expect(location.isDirty()).toEqual(false);

    location.setPosition([100, 100]);

    expect(location.position).toEqual([100, 100]);
    expect(location.isDirty()).toEqual(true);
});

test("setDescription", () => {
    expect(location.isDirty()).toEqual(false);

    const expectedDescription = { 10101: "soem description" };
    location.setDescription(expectedDescription);

    expect(location.description).toEqual(expectedDescription);
    expect(location.isDirty()).toEqual(true);
});

test("getUrl", () => {
    expect(location.getUrl()).toEqual("location");
});

test("getMarkerComponent", () => {
    expect(location.getMarkerComponent()).toEqual(LocationMarker);
});
