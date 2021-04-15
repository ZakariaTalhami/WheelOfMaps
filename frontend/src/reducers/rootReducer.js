import { combineReducers } from "redux";
import BookReducer from "./BookReducer";
import CharacterReducer from "./CharacterReducer";
import LocationReducer from "./LocationReducer";
import NavigationReducer from "./NavigationReducer";

const rootReducer = combineReducers({
    Books: BookReducer,
    Characters: CharacterReducer,
    Locations: LocationReducer,
    Navigation: NavigationReducer,
});

export default rootReducer;
