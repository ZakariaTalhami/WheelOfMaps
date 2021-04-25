import _ from "lodash";
import Character from "../models/character";

const { CHARACTER_LOADED } = require("../actions/types");

const INITIAL_STATE = {
    characters: [],
};

const constructCharacterState = (characters) => {
    if (_.isArray(characters)) {
        return characters.map((character) =>
            Character.ConstructFromObject(character)
        );
    }

    return [];
};

const CharacterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHARACTER_LOADED:
            return {
                ...state,
                characters: constructCharacterState(action.characters),
            };
        default:
            return state;
    }
};

export default CharacterReducer;
