const { LOACTION_LOADED } = require("../actions/types");

const INITIAL_STATE = {
    locations: [],
};

const LocationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOACTION_LOADED:
            return {
                ...state,
                locations: [...state.locations, ...action.locations],
            };
        default:
            return state;
    }
};

export default LocationReducer;
