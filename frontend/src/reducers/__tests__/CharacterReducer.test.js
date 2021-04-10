import { CHARACTER_LOADED } from "../../actions/types";
import Character from "../../models/character";
import CharacterReducer from "../CharacterReducer";

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

test("Retuns the initial state", () => {
    expect(CharacterReducer(undefined, {})).toEqual({ characters: [] });
});

test("Characters loaded action has empty list", () => {
    expect(
        CharacterReducer(undefined, {
            type: CHARACTER_LOADED,
            characters: [],
        })
    ).toEqual({ characters: [] });

    expect(
        CharacterReducer(undefined, {
            type: CHARACTER_LOADED,
            characters: undefined,
        })
    ).toEqual({ characters: [] });
});

test("Character list are instance of character model", () => {
    const newState = CharacterReducer(undefined, {
        type: CHARACTER_LOADED,
        characters: [MOCK_CHARACTER, MOCK_CHARACTER],
    });
    expect(newState.characters.length).toEqual(2);
    newState.characters.forEach((character) => {
        expect(character).toBeInstanceOf(Character);
    });
});
