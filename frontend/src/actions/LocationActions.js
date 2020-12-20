import axios from "axios";
import { LOACTION_LOADED } from "./types";

export const loadLocations = () => (dispatch) => {
    return axios
        .get("location")
        .then((res) => res.data)
        .then((data) => {
            dispatch({
                type: LOACTION_LOADED,
                locations: data,
            });
        });
};
