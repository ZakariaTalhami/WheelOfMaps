import axios from "axios";
import { LOCATIONS_LOADED } from "./types";

export const loadLocations = () => (dispatch) => {
    return axios
        .get("location")
        .then((res) => res.data)
        .then((data) => {
            dispatch({
                type: LOCATIONS_LOADED,
                locations: data,
            });
        });
};
