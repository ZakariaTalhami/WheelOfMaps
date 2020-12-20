import axios from "axios";
import { CHARACTER_LOADED } from "./types";

export const loadCharacters = () => (dispatch) => {
    return axios
        .get("character")
        .then((res) => res.data)
        .then((data) => {
            dispatch({
                type: CHARACTER_LOADED,
                characters: data,
            });
        });
};
