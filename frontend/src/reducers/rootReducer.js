import { combineReducers } from "redux";
import BookReducer from "./BookReducer";

const rootReducer = combineReducers({
  Books: BookReducer,
});

export default rootReducer;
