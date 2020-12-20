import { combineReducers } from "redux";
import BookReducer from "./BookReducer";
import CharacterReducer from "./CharacterReducer";
import LocationReducer from "./LocationReducer";

const rootReducer = combineReducers({
    Books: BookReducer,
    Characters: CharacterReducer,
    Locations: LocationReducer,
});

export default rootReducer;
