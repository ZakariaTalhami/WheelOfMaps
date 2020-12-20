const { CHARACTER_LOADED } = require("../actions/types");

const INITIAL_STATE = {
    characters: [],
};

const CharacterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHARACTER_LOADED:
            return {
                ...state,
                characters: [...state.characters, ...action.characters],
            };
        default:
            return state;
    }
};

export default CharacterReducer;
