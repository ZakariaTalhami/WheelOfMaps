import CharacterMarker from "../../views/map/Markers/CharacterMarker";
import Character from "../character";

const MOCK_MARKER = {
    icon: "path/to/icon",
    size: [32, 32],
    anchor: [16, 16],
    rotation: 0,
};

const MOCK_CHARACTER = {
    _id: "be7983c1-00db-4b1d-aef7-0dfc5946f8e3",
    name: "The fool in a hat",
    position: [
        {
            chapterRange: "01001",
            position: [1, 5],
        },
    ],
    chapterSummary: {
        "01001": "summary",
    },
    marker: MOCK_MARKER,
};

let character;
beforeEach(() => {
    character = Character.ConstructFromObject(MOCK_CHARACTER);
});

test("Initialization", () => {
    expect(character.marker).toBeDefined();
    expect(character.name).toEqual(MOCK_CHARACTER.name);
    expect(character.position).toEqual(MOCK_CHARACTER.position);
    expect(character.chapterSummary).toEqual(MOCK_CHARACTER.chapterSummary);
});

test("getPosition", () => {
    expect(character.getPosition("01001")).toEqual([1, 5]);
    expect(character.getPosition("20202")).toBeNull();
});

test("setName", () => {
    expect(character.isDirty()).toEqual(false);

    character.setName("new name");

    expect(character.name).toEqual("new name");
    expect(character.isDirty()).toEqual(true);
});

test("setPosition", () => {
    expect(character.isDirty()).toEqual(false);

    character.setPosition([100, 100]);

    expect(character.position).toEqual([100, 100]);
    expect(character.isDirty()).toEqual(true);
});

test("setChapterSummary/getChapterSummary", () => {
    expect(character.isDirty()).toEqual(false);

    character.setChapterSummary("10101", "some description");

    expect(character.getChapterSummary("10101")).toEqual("some description");
    expect(character.isDirty()).toEqual(true);
});

test("getUrl returns character endpoint", () => {
    expect(character.getUrl()).toEqual("character");
});

test("getMarkerComponent", () => {
    expect(character.getMarkerComponent()).toEqual(CharacterMarker);
});
