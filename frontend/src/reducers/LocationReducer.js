import _ from "lodash";
import Location from "../models/location";
const { LOCATIONS_LOADED } = require("../actions/types");

const INITIAL_STATE = {
    locations: [],
};

const constructLocationState = (locations) => {
    if (_.isArray(locations)) {
        return locations.map((location) =>
            Location.ConstructFromObject(location)
        );
    }

    return [];
};

const LocationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATIONS_LOADED:
            return {
                ...state,
                locations: constructLocationState(action.locations),
            };
        default:
            return state;
    }
};

export default LocationReducer;
