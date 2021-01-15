import axios from "axios";
import { BACKEND_BASE_URL } from "./apiUtils";

export const configureAxios = () => {
    axios.defaults.baseURL = `${BACKEND_BASE_URL}/api`;
};
